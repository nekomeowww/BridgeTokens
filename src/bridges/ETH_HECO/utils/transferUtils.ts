import { getStore } from "../../../services/storeService";
import { PREAUTHORIZE_AMOUNT } from './config';
import { parseValue } from "./txUtils";
import ERC20_ABI from "../abis/ERC20_ABI.json";
import ERC677_ABI from "../abis/ERC677_ABI.json";
import { MEDIATOR_CONTRACTS } from "./contracts";
import axios from 'axios'

/** 处理交易 */
export const handleBridgeMode = function(confirmTx: any) {
    const contracts = getMediatorContracts(confirmTx)
    switch (contracts.bridgeMode) {
        case "amb_native_erc":
            nativeTransfer(confirmTx, contracts)
            break
        case "multi_amb_erc_erc":
            tokenTransfer(confirmTx, contracts)
            break
    }
}

export const getMediatorContracts = function(confirmTx: any) {
    const store = getStore();
    const web3 = store.get("localWeb3")

    let abi;
    const bridgeMode = confirmTx.bridgeMode
    if (bridgeMode === 'amb_native_erc') {
        abi = ERC20_ABI
    } else {
        abi = ERC20_ABI
    }

    let source = MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.sourceNetwork][confirmTx.type]
    let dest = MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.sourceNetwork].release
    if (confirmTx.type === "release") {
        source = MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.destNetwork][confirmTx.type]
        dest = MEDIATOR_CONTRACTS.bridgeMode[bridgeMode][confirmTx.destNetwork].mint
    }

    const contracts = {
        bridgeMode: bridgeMode,
        source: source,
        sourceMediator: new web3.eth.Contract(abi, confirmTx.address),
        dest: dest,
    }

    console.log('Confirmed Transaction', confirmTx)
    console.log('Mediator Contracts', contracts)

    return contracts
}


export const nativeTransfer = async function(confirmTx: any, contracts: any) {
    const store = getStore();
    const web3 = store.get("localWeb3")
    const from = confirmTx.sourceAddress
    const recipient = process.env.REACT_APP_MAIN_ACCOUNT
    console.log(recipient)
    // const value = web3.utils.toWei(String(confirmTx.amount), "ether")
    const value = web3.utils.toBN(String(parseValue(confirmTx.amount, confirmTx.decimals))).toString()

    let data: any
    try {
        data = await axios.post(process.env.REACT_APP_API + "/contract/regist/transfer/account", { target: confirmTx.sourceAddress, amount: value, network: confirmTx.sourceNetworkShortName, targetNetwork: confirmTx.destNetworkShortName, contractName: 'ANT', contractAddr: '0x0', targetContractAddr: '0x0', fee: '0' })
    }
    catch (e) {
        console.error(e)
        return
    }

    const mediatorConfs = confirmTx.confirmations
    store.set("confirmationTotal", mediatorConfs)

    store.set("transactionType", "relay")
    store.set("waitingApproval", true)
    console.log(contracts)

    console.log({ target: confirmTx.sourceAddress, amount: value, network: confirmTx.sourceNetworkShortName, targetNetwork: confirmTx.destNetworkShortName, contractName: 'ANT', contractAddr: '0x0', targetContractAddr: '0x0' })
    
    setTimeout(async () => {
        await contracts.sourceMediator.methods.transfer(recipient, value).send({
            from: from
        }, (error: any, hash: any) => {
            if (error) {
                if (error.code === 4001) {
                    store.set("waitingApproval", false)
                    store.set("txRejected", true)
                } else {
                    store.set("waitingApproval", false)
                    store.set("unknownError", true)
                }
                return console.error(error);
            } else {
                // return callback(hash);
                store.set("sourceTxID", hash)
            }
        })
        .on("transactionHash", (tx: any) => {
            store.set("transferInProgress", true);
            store.set("waitingApproval", false);
            store.set("confirming", true);
            store.set("confirmationStep", 1);
        })
        .on('confirmation', function(confirmationNumber: number, receipt: any) {
            // const confirmed = updateRelayConfirmations(confirmationNumber, mediatorConfs)
            // if (confirmed) detectExchangeFinished(confirmTx.destAddress, value, contracts.dest, confirmTx.destNetwork, "amb_native_erc")
            detectExchangeFinished(data.data.data)
        })
        .on('error', function(error: any) {
            if (error.code === 4001) {
                store.set("confirming", false)
                store.set("txRejected", true)
            } else {
                store.set("confirming", false)
                store.set("unknownError", true)
            }
        })
    }, 5000)
}

export const tokenTransfer = async function(confirmTx: any, contracts: any) {
    const store = getStore();
    const web3 = store.get("localWeb3")
    const from = store.get("localWeb3Address")
    const token = new web3.eth.Contract(ERC20_ABI, confirmTx.address);

    if (contracts.sourceMediator) {
        const value = web3.utils.toBN(String(parseValue(confirmTx.amount, confirmTx.decimals))).toString()
        let excessValue = value
        if (confirmTx.sourceNetwork === "Ethereum") {
            excessValue = web3.utils.toBN(String(parseValue(PREAUTHORIZE_AMOUNT, confirmTx.decimals))).toString()
        }

        const allowance = await token.methods.allowance(from, contracts.source).call()
        if (window.BigInt(allowance) >= window.BigInt(value)) {
            console.log('Allowance exceeds value, skipping approval')
            bridgeTokens(contracts, confirmTx.address, value, from, confirmTx)
            return
        }

        store.set("waitingApproval", true);
        store.set("transactionType", "approve")
        await token.methods.approve(contracts.source, excessValue).send({ from }, (error: any, hash: any) => {
            if (error) {
                if (error.code === 4001) {
                    store.set("waitingApproval", false)
                    store.set("txRejected", true)
                } else {
                    store.set("waitingApproval", false)
                    store.set("unknownError", true)
                }
                return console.error(error);
            } else {
                // return callback(hash);
                store.set("sourceTxID", hash)
                store.set("transactionType", "approveConfs")
            }
        })
            .on('receipt', function(receipt: any) {
                store.set("waitingApproval", false);
            })

        bridgeTokens(contracts, confirmTx.address, value, from, confirmTx)
    }
}

export const bridgeTokens = async function(contracts: any, tokenAddress: string, value: number, from: string, confirmTx: any) {
    const store = getStore();
    const mediatorConfs = confirmTx.confirmations
    const recipient = confirmTx.destAddress
    store.set("confirmationTotal", mediatorConfs)

    // const dailyLimit = await contracts.sourceMediator.methods.dailyLimit(tokenAddress).call()
    // const minTx = await contracts.sourceMediator.methods.minPerTx(tokenAddress).call()
    // const maxTx = await contracts.sourceMediator.methods.maxPerTx(tokenAddress).call()
    // console.log(dailyLimit)
    // console.log(minTx)
    // console.log(maxTx)

    store.set("transactionType", "relay")
    store.set("waitingApproval", true)
    await contracts.sourceMediator.methods.relayTokens(tokenAddress, recipient, value).send({
        from
    }, (error: any, hash: any) => {
        if (error) {
            if (error.code === 4001) {
                store.set("waitingApproval", false)
                store.set("txRejected", true)
            } else {
                store.set("waitingApproval", false)
                store.set("unknownError", true)
            }
            return console.error(error);
        } else {
            store.set("sourceTxID", hash)
        }
    })
        .on("transactionHash", (tx: any) => {
            store.set("transferInProgress", true);
            store.set("waitingApproval", false);
            store.set("confirming", true);
            store.set("confirmationStep", 1);
        })
        .on('confirmation', function(confirmationNumber: number, receipt: any) {
            // const confirmed = updateRelayConfirmations(confirmationNumber, mediatorConfs)
            // if (confirmed) detectExchangeFinished(confirmTx.destAddress, value, contracts.dest, confirmTx.destNetwork, "multi_amb_erc_erc")
        })
        .on('error', function(error: any) {
            if (error.code === 4001) {
                store.set("confirming", false)
                store.set("txRejected", true)
            } else {
                store.set("confirming", false)
                store.set("unknownError", true)
            }
        })
}

export const updateRelayConfirmations = function(confirmationNumber: number, confirmationTotal: number) {
    const store = getStore();
    store.set("confirmationTotal", confirmationTotal);

    if (confirmationNumber === confirmationTotal) {
        store.set("confirmationNumber", confirmationNumber);
        setTimeout(() => {
            store.set("confirmationStep", 2);
            store.set("confirmationNumber", 0);
        }, 1000);
        return true
    } else if (confirmationNumber < confirmationTotal) {
        confirmationNumber++;
        store.set("confirmationNumber", confirmationNumber);
    }
}

const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export const detectExchangeFinished = async function(id: string) {
    const store = getStore();

    setTimeout(async () => {
        axios.get(process.env.REACT_APP_API + '/contract/status', { params: { id: id } }).then(res => {
            if (res.data.data.code < 0) {
                console.error(res.data.data.message)
                store.set("confirming", false)
                store.set("validatorError", true)
                return
            }
            else if (res.data.data.code === 1009) {
                const txID = res.data.data.outcomeData.transactionHash
                store.set("destTxID", txID);
                store.set("confirming", false);
                store.set("transferSuccess", true);
                return
            }
            else {
                detectExchangeFinished(id)
            }
        })
    }, 30000)

    // const web3 = new Web3(new Web3.providers.HttpProvider(SUPPORTED_RPC_URLS[destNetwork]))

    // let abi = ERC20_ABI
    // if (type === "multi_amb_erc_erc") {
    //     abi = ERC20_ABI
    // }
    // // Odd issue with importing mediator ABI. TokensBridged 3 vs 4 inputs
    // // @ts-ignore
    // const contract = new web3.eth.Contract(abi, dest)

    // let fromBlock = await web3.eth.getBlockNumber()
    // const stopTime = Date.now() + VALIDATOR_TIMEOUT
    // while (Date.now() <= stopTime) {
    //     const currentBlock = await web3.eth.getBlockNumber()

    //     const events: EventData[] = await contract.getPastEvents('TokensBridged', {
    //         fromBlock,
    //         toBlock: currentBlock
    //     }, function(error: any, event: any) {
    //         if (error) {
    //             console.error(error)
    //             store.set("confirming", false)
    //             store.set("validatorError", true)
    //             return
    //         }
    //     })

    //     const confirmationEvent = events.filter(event => event.returnValues.recipient === recipient)

    //     if (confirmationEvent.length > 0) {
            // const txID = confirmationEvent[0].transactionHash
            // store.set("destTxID", txID);
            // store.set("confirming", false);
            // store.set("transferSuccess", true);
            // return
    //     }
    //     fromBlock = currentBlock
    //     await wait(12000);
    // }

    // if (Date.now() > stopTime) {
    //     console.log('Mediator contract TokensBridged timeout. Over 5 minutes has elapsed.')
    //     store.set("confirming", false)
    //     store.set("validatorTimeout", true)
    //     return
    // }
}

export const ERC_ERC_MEDIATOR_ABI: any =
    [{
        "anonymous": false,
        "inputs": [
            { "indexed": true, "name": "token", "type": "address" },
            { "indexed": true, "name": "recipient", "type": "address" },
            { "indexed": false, "name": "value", "type": "uint256" },
            { "indexed": true, "name": "messageId", "type": "bytes32" }
        ],
        "name": "TokensBridged",
        "type": "event"
    }]

export const NATIVE_ERC_MEDIATOR_ABI: any =
    [{
        "anonymous": false,
        "inputs": [
            { "indexed": true, "name": "recipient", "type": "address" },
            { "indexed": false, "name": "value", "type": "uint256" },
            { "indexed": true, "name": "messageId", "type": "bytes32" }
        ],
        "name": "TokensBridged",
        "type": "event"
    }]

