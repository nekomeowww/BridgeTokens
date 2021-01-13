import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ELA_AMB_NATIVE_ERC_MIN_TX, ELA_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from './config';
import ELA_ICON from "../../../assets/ela.png"

export const ELA_DEV = {
    0: {
        symbol: 'ANT',
        name: 'ELA on Ethereum',
        id: 'heco',
        transferType: 'release',
        network: 'Huobi Mainnet',
        networkShortName: 'heco',
        networkID: 128,
        address: '',
        confirmations: ETH_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    1: {
        symbol: 'ANT',
        name: 'Elastos',
        id: 'bnb',
        transferType: 'mint',
        network: 'Binance Testnet',
        networkShortName: 'binanceTest',
        networkID: 97,
        address: '',
        confirmations: ELA_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_HOME,
    },
    home: 1,
    foreign: 0,
    icon: ELA_ICON,
    bridgeMode: 'amb_native_erc',
    decimals: 18,
    minTx: ELA_AMB_NATIVE_ERC_MIN_TX,
    maxTx: ELA_AMB_NATIVE_ERC_MAX_TX,
    priceTicker: 'ela',
    priceFeed: 'https://api.coincap.io/v2/assets/elastos',
}