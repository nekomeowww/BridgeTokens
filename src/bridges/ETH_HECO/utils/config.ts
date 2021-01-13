import MetaMask from "../../../assets/metamask-fox.svg";
import Elaphant from "../../../assets/elaphant.png";
import WalletConnect from "../../../assets/walletconnect.svg";
import { ETH_DEFAULTS } from '../tokens'

import { networks } from "../../../config"

export const VALIDATOR_TIMEOUT = 300000 // Milliseconds
export const PREAUTHORIZE_AMOUNT = 1000000 // Tokens

export const WALLET_ICON_MAP: { [key in string]: string } = {
    MetaMask: MetaMask,
    Elaphant: Elaphant,
    WalletConnect: WalletConnect,
};

export const SUPPORTED_NETWORK_IDS: { [key in number]: string } = networks.SUPPORTED_NETWORK_IDS

export const EXPLORER_URLS: { [key in string]: string } = networks.EXPLORER_URLS

export const SUPPORTED_RPC_URLS: { [key in string]: string } = networks.SUPPORTED_RPC_URLS

export const INITIAL_STATE = {
    // wallet & web3
    dataWeb3: null,
    localWeb3: null,
    localWeb3Address: "",
    localWeb3Network: "",
    walletConnecting: false,
    loadingBalances: true,
    fees: null,
    selectedWallet: false,
    selectedWalletType: "MetaMask",

    // bridge selection
    selectedBridge: "eth",
    selectedPair: "ela",
    confirmBridge: false,

    // token
    token: ETH_DEFAULTS[0],
    tokenList: ETH_DEFAULTS,

    // modals
    localesOpen: false,
    showWalletModal: false,

    // errors
    noWeb3: false,
    wrongNetwork: false,
    insufficientBalance: false,
    belowMinTxLimit: false,
    exceedsMaxTxLimit: false,
    txRejected: false,
    unknownError: false,

    // warnings
    walletConnectWarning: false,
    validatorError: false,
    validatorTimeout: false,

    // awaiting user
    waitingApproval: false,

    // confirmations
    confirmTx: null,
    confirmationNumber: 0,
    confirmationTotal: null,
    transferInProgress: false,
    confirming: false,
    confirmationStep: 0,
    transferSuccess: false,
    transactionType: "",

    // txIDs
    sourceTxID: null as string | null,
    destTxID: null as string | null,

    // conversions
    "convert.selectedDirection": 0,
    "convert.amount": "",
    "convert.destination": "",

    // sidechain deposit and withdraw
    page: "bridge",
    depositMainchainAddress: "",
    exchangeID: 0,
    depositStatus: "Sidechain.Deposit.Renewal.Waiting",
    depositInProgress: 0,
    monitoringTransfer: false,
    withdrawalAmount: 0,
    withdrawalAddress: "",
    withdrawalInProgress: 0,
    withdrawalStatus: "Sidechain.Withdraw.Waiting",
    cryptoName: "",
    cryptoNameFound: false

};