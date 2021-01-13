import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ETH_AMB_NATIVE_ERC_MIN_TX, ETH_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from './config';
import ETH_ICON from "../../../assets/eth.png";

export const ETH_DEV = {
    0: {
        symbol: 'Null',
        name: 'Ethereum',
        id: 'bnb',
        transferType: 'mint',
        network: 'Binance Testnet',
        networkShortName: 'binanceTest',
        networkID: 97,
        address: '',
        confirmations: ETH_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_HOME,

    },
    1: {
        symbol: 'Null',
        name: 'ETH on Elastos',
        id: 'huobi',
        transferType: 'release',
        network: 'Heco Mainnet',
        networkShortName: 'heco',
        networkID: 128,
        address: '',
        confirmations: ELA_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,

    },
    home: 0,
    foreign: 1,
    icon: ETH_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: ETH_AMB_NATIVE_ERC_MIN_TX,
    maxTx: ETH_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'eth',
    priceFeed: 'https://api.coincap.io/v2/assets/ethereum',
}