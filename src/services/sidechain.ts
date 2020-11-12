import Web3 from "web3";
import { getStore } from "./storeService";
import { SIDECHAIN_TRANSFER_TIMEOUT, MAINCHAIN_RETURN_ADDRESS, SIDECHAIN_RELAY_ADDRESS } from "./config";
import { SUPPORTED_RPC_URLS } from '../bridges/ETH_ELA/utils/config';
import { formatValue } from '../bridges/ETH_ELA/utils/txUtils';


export const depositELA = async function() {
    const store = getStore();
    const address = store.get("localWeb3Address")
    if (address.length === 0) return
    store.set("depositInProgress", 0)
    store.set("depositStatus", "Sidechain.Deposit.Renewal.Waiting")
    store.set("monitoringTransfer", false)

    const req = {
        "user_did": address,
        "src_chain_id": 1,
        "back_addr": MAINCHAIN_RETURN_ADDRESS,
        "dst_chain_id": 3,
        "dst_addr": address
    };

    try {
        const generateAddress = await fetch("https://transfer.elaphant.net/api/1/ela_exchange/generator", {
            body: JSON.stringify(req),
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: "POST",
        });
        const response = (await generateAddress.json())
        const depositAddress = response.data.src_chain_addr;
        const exchangeID = response.data.exchange_id;
        store.set("monitoringTransfer", true)
        store.set('depositMainchainAddress', depositAddress);
        store.set('exchangeID', exchangeID);
        checkDepositStatus();

    } catch (e) {
        console.error(e);
    }
}

export const withdrawELA = async function(withdrawalAddress: string, withdrawalAmount: number) {
    const store = getStore();
    const web3 = store.get("localWeb3")
    const localWeb3Address = store.get("localWeb3Address")
    store.set("withdrawalInProgress", 0)

    let contract = new web3.eth.Contract([{ "constant": false, "inputs": [{ "name": "_addr", "type": "string" }, { "name": "_amount", "type": "uint256" }, { "name": "_fee", "type": "uint256" }], "name": "receivePayload", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_addr", "type": "string" }, { "indexed": false, "name": "_amount", "type": "uint256" }, { "indexed": false, "name": "_crosschainamount", "type": "uint256" }, { "indexed": true, "name": "_sender", "type": "address" }], "name": "PayloadReceived", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_sender", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }, { "indexed": true, "name": "_black", "type": "address" }], "name": "EtherDeposited", "type": "event" }]);
    contract.options.address = SIDECHAIN_RELAY_ADDRESS;
    const value = web3.utils.toWei(withdrawalAmount.toString(), "ether")
    const cdata = contract.methods.receivePayload(withdrawalAddress, value, "100000000000000").encodeABI();
    let tx = { data: cdata, to: contract.options.address, from: localWeb3Address, value: value };

    web3.eth.sendTransaction(tx)
        .on('transactionHash', function(hash: any) {
            store.set("withdrawalInProgress", 1)
            store.set("withdrawalStatus", "Sidechain.Withdraw.Confirming")
        })
        .on('confirmation', function(confirmationNumber: any, receipt: any) {
            if (confirmationNumber === 2) {
                store.set("withdrawalInProgress", 2)
                store.set("withdrawalStatus", "Sidechain.Withdraw.Complete")
            }
        })
        .on('error', console.error);

}

const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export const checkDepositStatus = async function() {
    const store = getStore();
    const exchangeID = store.get("exchangeID");
    const address = store.get("localWeb3Address");
    const monitoringTransfer = store.get("monitoringTransfer")

    const stopTime = Date.now() + SIDECHAIN_TRANSFER_TIMEOUT
    const startingBalance = await fetchELABalance()

    while (Date.now() <= stopTime) {
        const depositMainchainAddress = store.get('depositMainchainAddress');
        if (!monitoringTransfer) return

        const fetchDepositStatus = await fetch(`https://transfer.elaphant.net/api/1/ela_exchange/${address}/tx/${exchangeID}`, {
            method: "GET",
        })
        const res = (await fetchDepositStatus.json())
        if (!res.data) break
        if (res.data.src_chain_addr !== depositMainchainAddress) return

        switch (res.data.state) {
            case "renewal_waiting":
                store.set("depositStatus", "Sidechain.Deposit.Renewal.Waiting")
                store.set("depositInProgress", 0);
                break;
            case "renewal_timeout":
                store.set("depositStatus", "Sidechain.Deposit.Renewal.Timeout")
                store.set("depositInProgress", 2);
                break;
            case "transferring":
                store.set("depositStatus", "Sidechain.Deposit.Transferring")
                store.set("depositInProgress", 1);
                break;
            case "transfer_finish":
                store.set("depositStatus", "Sidechain.Deposit.Transfer.Finish")
                store.set("depositInProgress", 2);
                break;
            case "transfer_failed":
                store.set("depositStatus", "Sidechain.Deposit.Transfer.Failed")
                store.set("depositInProgress", 2);
                break;
            case "backing":
                store.set("depositStatus", "Sidechain.Deposit.Backing")
                store.set("depositInProgress", 1);
                break;
            case "back_finish":
                store.set("depositStatus", "Sidechain.Deposit.Back.Finish")
                store.set("depositInProgress", 1);
                break;
            case "back_failed":
                store.set("depositStatus", "Sidechain.Deposit.Back.Failed")
                store.set("depositInProgress", 2);
                break;
            case "direct_transferring":
                store.set("depositStatus", "Sidechain.Deposit.Direct.Transferring")
                store.set("depositInProgress", 1);
                break;
            case "direct_transferring_wait_gather":
                store.set("depositStatus", "Sidechain.Deposit.Direct.Transferring")
                store.set("depositInProgress", 1);
                break;
            case "direct_transfer_finish":
                store.set("depositStatus", "Sidechain.Deposit.Direct.Transfer.Finish")
                store.set("depositInProgress", 2);
                break;
            case "direct_transfer_failed":
                store.set("depositStatus", "Sidechain.Deposit.Direct.Transfer.Failed")
                store.set("depositInProgress", 1);
                break;
        }
        const newBalance = Number(await fetchELABalance())
        const depositValue = newBalance - Number(startingBalance)
        if (store.get("depositInProgress") === 2 && depositValue > 0) {
            store.set("elaBalance", newBalance);
            store.set("depositValue", depositValue)
            store.set("monitoringTransfer", false)
            return
        }
        await wait(8000);
    }

    if (Date.now() > stopTime) {
        console.log('Transfer status timeout. Over 60 minutes has elapsed.')
        store.set("monitoringTransfer", false)
        return
    }
}

export const fetchELABalance = async function() {
    const store = getStore();
    const walletAddress = store.get("localWeb3Address");
    const web3 = new Web3(new Web3.providers.HttpProvider(SUPPORTED_RPC_URLS["Elastos"]))

    const coinBal = await web3.eth.getBalance(walletAddress)
    const elaBalance = formatValue(coinBal, 18)
    return elaBalance
}
