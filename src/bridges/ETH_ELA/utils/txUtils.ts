import { getStore } from "../../../services/storeService";
import { EXPLORER_URLS } from "./config";
import { fetchTokenBalance, appendCustomTokens, getDefaultTokens } from "./walletUtils";

export const windowBlocker = function(event: any) {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    const msg =
        "WARNING: closing the browser window now may result in loss of funds. Are you sure?";

    // Chrome requires returnValue to be set.
    event.returnValue = msg;
    return msg;
};

export const setWindowBlocker = function() {
    window.addEventListener("beforeunload", windowBlocker);
};

export const removeWindowBlocker = function() {
    window.removeEventListener("beforeunload", windowBlocker);
};


export const formatValue = (num: any, dec: number) => {
    const number = window.BigInt(num);
    const round = window.BigInt(10 ** Number(dec));
    const value = Number((number * window.BigInt(1000)) / round) / 1000;
    return value.toFixed(4);
};

const countDecimals = (value: any) => {
    if (Math.floor(value) === value) return 0;
    return value.toString().split('.')[1].length || 0;
};

export const parseValue = (num: any, dec: number) => {
    if (!num) {
        return window.BigInt(0);
    }
    const number = Number(num);
    const numberDec = countDecimals(number);
    const round = window.BigInt(10 ** Number(dec));
    const value =
        (window.BigInt(Math.floor(number * 10 ** numberDec)) * round) /
        window.BigInt(10 ** numberDec);
    return value;
};

export const convertWei = function(value: string, type: 'from' | 'to') {
    const store = getStore();
    const web3 = store.get("localWeb3")
    switch (type) {
        case 'from': {
            return web3.utils.fromWei(value)
        }
        case 'to': {
            return web3.utils.toWei(value)
        }
    }
}

export const gatherFeeData = async function(direction: number) {
    const store = getStore();
    const amount = store.get("convert.amount");
    let token = store.get("token");

    if (!amount) {
        return;
    }

    const fee = token[direction].fee / 100
    const feeFraction = (100 - token[direction].fee) / 100
    const total =
        Number(amount * feeFraction) > 0
            ? Number(amount * feeFraction).toFixed(6)
            : "0.000000";

    store.set("convert.networkFee", fee);
    store.set("convert.conversionTotal", total);
};

export function getExplorerLink(network: 'source' | 'dest', type: 'transaction' | 'token' | 'address', txInputs: any, id: string): string {
    const chain = txInputs[`${network}Network`]
    const prefix = EXPLORER_URLS[chain]
    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${id}`
        }
        case 'token': {
            return `${prefix}/token/${id}`
        }
        case 'address':
        default: {
            return `${prefix}/address/${id}`
        }
    }
}

export function restoreInitialState() {
    const store = getStore();
    const token = store.get("token")
    fetchTokenBalance(token)
    store.set("confirmTx", false)
    store.set("convert.amount", "")
    store.set("waitingApproval", false)
    store.set("confirmationProgress", false)
    store.set("confirmationNumber", 0)
    store.set("transferInProgress", false)
    store.set("confirming", false)
    store.set("confirmationStep", 0)
    store.set("transferSuccess", false)
    store.set("validatorError", false)
    store.set("validatorTimeout", false)

}

export function switchOriginChain(selectedDirection: any) {
    const store = getStore();
    if (selectedDirection === 0) {
        store.set("convert.selectedDirection", Number(1));
    } else {
        store.set("convert.selectedDirection", Number(0));
    }

    store.set("confirmTx", false)
    store.set("convert.amount", "")
    const token = store.get("token")
    const DEFAULTS: any = getDefaultTokens(store.get("localWeb3Network"))
    appendCustomTokens(DEFAULTS)
    if (token[Number(!selectedDirection)].address.length === 0) {
        store.set("token", DEFAULTS[0]);
        fetchTokenBalance(DEFAULTS[0])
    } else {
        fetchTokenBalance(token)
    }

    // Swap bridge direction
    const bridge = store.get("selectedBridge")
    const pair = store.get("selectedPair")
    store.set("selectedBridge", pair)
    store.set("selectedPair", bridge)
}