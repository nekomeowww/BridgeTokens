import * as Sentry from "@sentry/react";
import { getStore } from "../../../services/storeService";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_HOME, MULTI_AMB_ERC_ERC_FEE_FOREIGN } from '../tokens/config';
import { SUPPORTED_NETWORK_IDS, SUPPORTED_RPC_URLS } from './config';
import { ETH_DEFAULTS, ELA_DEFAULTS, ETH_DEV_DEFAULTS, ELA_DEV_DEFAULTS } from "../tokens";
import { switchOriginChain, formatValue } from "./txUtils";
import { depositELA } from "../../../services/sidechain";
import ERC20_ABI from "../abis/ERC20_ABI.json";
import ELA_ICON from "../../../assets/ela.png";
import ETH_ICON from "../../../assets/eth.png";

export const init = function() {
    const store = getStore();
    const initialAsset = store.get("token")
    fetchTokenBalance(initialAsset)
}

export const disconnectWeb3Provider = async function() {
    const store = getStore();
    const web3 = store.get("localWeb3");
    if (!web3) return
    const provider: any = web3.currentProvider;
    await provider.disconnect()
}


export const initLocalWeb3 = async function(type?: any) {
    const store = getStore();
    // disconnectWeb3Provider()
    store.set("walletConnecting", true);
    store.set("spaceError", false);

    // already connected
    if (store.get("localWeb3Address")) {
        return;
    }

    let web3;
    let accounts: string[] = [];
    let network: any = "";
    let netId: number;

    try {
        // if (type === "injected" || !type) {
        if (type === "MetaMask" || !type) {
            // Check if user has web3 installed
            if (typeof window.ethereum !== 'undefined'
                || (typeof window.web3 !== 'undefined')) {
                // Web3 browser user detected. You can now use the provider.
            } else {
                store.set("noWeb3", true)
                return
            }

            const web3Modal = new Web3Modal({
                cacheProvider: false, //optional
            });
            const web3Provider = await web3Modal.connect();

            web3 = new Web3(web3Provider);

        } else if (type === "WalletConnect") {
            const provider: any = new WalletConnectProvider({
                rpc: {
                    1: SUPPORTED_RPC_URLS["Ethereum"],
                    20: SUPPORTED_RPC_URLS["Elastos"],
                    21: "https://rpc.elaeth.io",
                    42: SUPPORTED_RPC_URLS["Kovan"],
                }
            });
            await provider.enable();
            web3 = new Web3(provider);
        } else {
            console.error("Invalid wallet type.");
            store.set("spaceError", true);
            store.set("spaceRequesting", false);
            store.set("walletConnecting", false);
            return;
        }
    } catch (e) {
        console.error(e);
        Sentry.withScope(function(scope) {
            scope.setTag("error-hint", "web3 init");
            Sentry.captureException(e);
        });
        store.set("spaceError", true);
        store.set("spaceRequesting", false);
        store.set("walletConnecting", false);
        return;
    }

    setListener(web3)
    if (typeof web3.currentProvider === "string") return;
    if (!web3.currentProvider) return;
    accounts = await web3.eth.getAccounts();
    netId = await web3.eth.net.getId();
    network = SUPPORTED_NETWORK_IDS[netId]
    store.set("walletConnecting", false);

    // Configure current network tokens
    store.set("localWeb3", web3);
    store.set("localWeb3Address", accounts[0]);
    store.set("localWeb3Network", network);
    store.set("selectedWallet", true);
    store.set("convert.destinationValid", true);
    if (store.get("page") === "sidechain") {
        depositELA()
    }
    setBridgeDirection(netId)
    return;
};

export const isSelectedNetwork = function() {
    const store = getStore();
    // const selectedAsset = store.get("selectedAsset");
    const token = store.get("token");
    const direction = store.get("convert.selectedDirection");
    const localWeb3Network = store.get("localWeb3Network");
    const targetWeb3Network = token[direction].network;
    const correctNetwork = localWeb3Network === targetWeb3Network;

    if (!correctNetwork) {
        store.set("wrongNetwork", true);
    } else {
        return true;
    }
}

export const generateCustomTokenDetails = async function(tokenAddress: string, network: string) {

    const store = getStore();
    let web3 = store.get("localWeb3");
    if (!web3) {
        return
    }

    const networkID = await web3.eth.net.getId();
    const home = getHomeNetwork(networkID)

    const isContract = await (isContractAddress(tokenAddress))
    if (!isContract) return

    const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    const [name, symbol, decimals] = await Promise.all([
        tokenContract.methods.name().call(),
        tokenContract.methods.symbol().call(),
        tokenContract.methods.decimals().call(),
    ]);

    const alreadyBridged = detectBridgedToken(name, symbol)
    const pairNetwork = getPairNetwork(networkID, 'id')

    const details = {
        0: {
            symbol: home ? getDestToken(symbol, 0, 'symbol', alreadyBridged) : symbol,
            name: home ? getDestToken(name, 0, 'name', alreadyBridged) : name,
            id: home ? getDestToken(symbol, 0, 'id', alreadyBridged) : symbol.toLowerCase(),
            transferType: getTransferType(Number(home), 0, alreadyBridged),
            network: home ? getPairNetwork(networkID, 'name') : getPairNetwork(Number(pairNetwork), 'name'),
            networkID: home ? pairNetwork : getPairNetwork(Number(pairNetwork), 'id'),
            address: home ? '' : tokenAddress,
            confirmations: getRequiredConfirmations(0),
            fee: home ? MULTI_AMB_ERC_ERC_FEE_HOME : MULTI_AMB_ERC_ERC_FEE_FOREIGN,
        },
        1: {
            symbol: home ? symbol : getDestToken(symbol, 1, 'symbol', alreadyBridged),
            name: home ? name : getDestToken(name, 1, 'name', alreadyBridged),
            id: home ? symbol.toLowerCase() : getDestToken(symbol, 1, 'id', alreadyBridged),
            transferType: getTransferType(Number(home), 1, alreadyBridged),
            network: home ? getPairNetwork(Number(pairNetwork), 'name') : getPairNetwork(networkID, 'name'),
            networkID: home ? getPairNetwork(Number(pairNetwork), 'id') : pairNetwork,
            address: home ? tokenAddress : '',
            confirmations: getRequiredConfirmations(1),
            fee: home ? MULTI_AMB_ERC_ERC_FEE_FOREIGN : MULTI_AMB_ERC_ERC_FEE_HOME,
        },
        home: home,
        foreign: Number(!home),
        icon: home ? ELA_ICON : ETH_ICON,
        bridgeMode: 'multi_amb_erc_erc',
        decimals: Number(decimals),
        minTx: MULTI_AMB_ERC_ERC_MIN_TX,
        maxTx: MULTI_AMB_ERC_ERC_MAX_TX,
        priceTicker: '',
        priceFeed: '',
    };

    return details;
}

export const addCustomToken = (customToken: any, network: string) => {
    let localTokensList = window.localStorage.getItem('customTokens') as any
    let customTokensList = []

    if (!localTokensList) {
        localTokensList = []
    }
    if (localTokensList.length < 1) {
        customTokensList = localTokensList.concat([customToken]);
    } else {
        customTokensList = JSON.parse(localTokensList);
        customTokensList.push(customToken);
    }
    customTokensList = uniqueTokens(customTokensList);
    window.localStorage.setItem(
        'customTokens',
        JSON.stringify(customTokensList),
    );
    appendCustomTokens(getDefaultTokens(network));
}

export const uniqueTokens = (list: any) => {
    const seen: any = {};
    return list.filter((token: any) => {
        const { address } = token[token.home];
        const lowerCaseAddress = address.toLowerCase();
        const isDuplicate = Object.prototype.hasOwnProperty.call(
            seen,
            lowerCaseAddress,
        )
            ? false
            : (seen[lowerCaseAddress] = true);
        return isDuplicate;
    });
};

export const appendCustomTokens = (defaultTokens: any) => {
    const store = getStore();
    const network = store.get("localWeb3Network");
    const direction = store.get("convert.selectedDirection");
    let localTokenList = JSON.parse(
        window.localStorage.getItem("customTokens") as any
    );
    if (!localTokenList) {
        updateAllTokenBalances(defaultTokens)
        store.set("token", defaultTokens[0])
        store.set("tokenList", defaultTokens)
        return
    }
    const customTokenList = localTokenList.filter(
        (token: any) => token[direction].network === network && token[direction].address.length > 0
    );
    const tokenList = defaultTokens.concat(customTokenList);
    updateAllTokenBalances(tokenList)
    store.set("tokenList", tokenList)
    return

};

export const updateAllTokenBalances = async function(tokenList: any) {
    const tokenListWithBalances = // await Promise.all(
        tokenList.forEach((token: any) => {
            fetchTokenBalance(token)
        })
    return tokenListWithBalances
}

export const getDefaultTokens = (network: string) => {
    switch (network) {
        case 'Ethereum':
            return ETH_DEFAULTS
        case 'Elastos':
            return ELA_DEFAULTS
        case 'Kovan':
            return ETH_DEV_DEFAULTS
        case 'Elastos Testnet':
            return ELA_DEV_DEFAULTS
        default:
            return ETH_DEFAULTS
    }
}

const detectBridgedToken = (name: string, symbol: string) => {
    const prefix = symbol.substring(0, 3) === 'eth' || symbol.substring(0, 3) === 'ela'
    const ela = name.includes('on Elastos')
    const eth = name.includes('on Ethereum')

    if (prefix || ela || eth) return true
    return false
}

const getDestToken = (data: string, home: number, type: 'name' | 'symbol' | 'id', alreadyBridged: boolean) => {
    switch (type) {
        case 'name':
            if (alreadyBridged) return data.split(" ")[0]
            if (home === 1) {
                return `${data} on Elastos`
            }
            return `${data} on Ethereum`
        case 'symbol':
            if (alreadyBridged) return data.slice(3)
            if (home === 0) {
                return 'ela'.concat(data)
            }
            return 'eth'.concat(data)
        case 'id':
            if (alreadyBridged) return data.slice(3).toLowerCase()
            if (home === 0) {
                return 'ela'.concat(data.toLowerCase())
            }
            return 'eth'.concat(data.toLowerCase())
    }

}

const getTransferType = (home: number, network: number, alreadyBridged: boolean) => {
    switch (alreadyBridged) {
        case true:
            if (home === network) return 'release'
            return 'mint'
        case false:
            if (home === network) return 'mint'
            return 'release'
    }
}

const getRequiredConfirmations = (home: number) => {
    switch (home) {
        case 0:
            return ETH_CONFIRMATIONS
        case 1:
            return ELA_CONFIRMATIONS
        default:
            return ETH_CONFIRMATIONS
    }
}

const getHomeNetwork = (networkID: number) => {
    switch (networkID) {
        case 20:
            return 1
        case 21:
            return 1
        case 1:
            return 0
        case 42:
            return 0
    }
}

const getPairNetwork = (networkID: number, type: 'id' | 'name') => {
    switch (networkID) {
        case 20:
            if (type === 'id') return 1
            return 'Ethereum'
        case 21:
            if (type === 'id') return 42
            return 'Kovan'
        case 1:
            if (type === 'id') return 20
            return 'Elastos'
        case 42:
            if (type === 'id') return 21
            return 'Elastos Testnet'
    }
}


export const setBridgeDirection = async function(netId: number) {
    const store = getStore();
    const selectedDirection = store.get("convert.selectedDirection")
    const token = store.get("token")
    const DEFAULTS = getDefaultTokens(SUPPORTED_NETWORK_IDS[netId])
    store.set("token", DEFAULTS[0])
    appendCustomTokens(DEFAULTS)
    // Set default transfer direction
    switch (netId) {
        case 1:
            store.set("localWeb3Network", "Ethereum")
            if (selectedDirection === 0) { fetchTokenBalance(token); return }
            switchOriginChain(selectedDirection)
            break
        case 42:
            store.set("localWeb3Network", "Kovan")
            if (selectedDirection === 0) { fetchTokenBalance(token); return }
            switchOriginChain(selectedDirection)
            break
        case 20:
            store.set("localWeb3Network", "Elastos")
            if (selectedDirection === 1) { fetchTokenBalance(token); return }
            switchOriginChain(selectedDirection)
            break
        case 21:
            store.set("localWeb3Network", "Elastos Testnet")
            if (selectedDirection === 1) { fetchTokenBalance(token); return }
            switchOriginChain(selectedDirection)
            break
    }
}

export const clearWeb3 = async function() {
    const store = getStore();
    store.set("localWeb3", null);
    store.set("localWeb3Address", "");
    store.set("localWeb3Network", null);
    store.set("walletConnecting", false);
    store.set("selectedWallet", false);
}

export const fetchTokenBalance = async function(token: any) {
    fetchTokenPrice(token)
    if (!token) return

    const store = getStore();
    const web3 = store.get("localWeb3");
    const walletAddress = store.get("localWeb3Address");
    const walletNetwork = store.get("localWeb3Network");
    const direction = store.get("convert.selectedDirection");

    if (!web3 || !walletAddress) return
    if (token[direction].network !== walletNetwork) return

    // if native coin
    if (token.bridgeMode === "amb_native_erc" && token.home === direction) {
        const coinBal = await web3.eth.getBalance(walletAddress)
        store.set(`${token[direction].id}Balance`, formatValue(coinBal, token.decimals));
        return
    }

    // if token
    if (!token[direction].address) return
    const tokenContract = new web3.eth.Contract(ERC20_ABI, token[direction].address);
    const tokenBal = await tokenContract.methods.balanceOf(walletAddress).call();

    store.set(`${token[direction].id}Balance`, formatValue(tokenBal, token.decimals));
    store.set("loadingBalances", false);
    return
}

export const fetchTokenPrice = async function(token: any) {
    const store = getStore();

    if (token.priceFeed.length === 0) return
    try {
        const price = await fetch(token.priceFeed, {
            method: "GET",
        });
        store.set(`${token.priceTicker}usd`, (await price.json()).data.priceUsd);
    } catch (e) {
        console.error(e);
    }
}

// export const watchWalletData = async function() {
//     if (walletDataInterval) {
//         clearInterval(walletDataInterval);
//     }
//     // await updateAllowance()
//     await updateBalance();
//     walletDataInterval = setInterval(async () => {
//         // await updateAllowance()
//         await updateBalance();
//     }, 10 * 1000);
// };

export const setListener = async function(web3: any) {
    const store = getStore();
    // @ts-ignore
    if ((!web3.currentProvider as any).on) return;
    // @ts-ignore FIXME: provide propper provider type
    const listeningProvider: any = web3.currentProvider;
    if (listeningProvider.on) {
        // listen for changes
        listeningProvider.on("accountsChanged", async () => {
            clearWeb3()
            initLocalWeb3()
        });
        listeningProvider.on("chainChanged", async () => {
            clearWeb3()
            store.set("wrongNetwork", false)
            initLocalWeb3()
        });
        listeningProvider.on("disconnected", async () => {
            window.location.reload();
        });
    }
}

export const abbreviateAddress = function(walletAddress: string) {
    if (!walletAddress || typeof walletAddress !== "string") {
        return "";
    } else {
        return (
            walletAddress.slice(0, 5) +
            "..." +
            walletAddress.slice(walletAddress.length - 5)
        );
    }
};

export const isContractAddress = async function(address: string) {
    const store = getStore();
    const web3 = store.get("localWeb3");

    const code = await web3.eth.getCode(address);
    const isContract = code === '0x' ? false : true;
    return isContract
}

export default {};

