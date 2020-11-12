import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ELA_AMB_NATIVE_ERC_MIN_TX, ELA_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from './config';
import ELA_ICON from "../../../assets/ela.png"

export const ELA_DEV = {
    0: {
        symbol: 'ELA',
        name: 'ELA on Ethereum',
        id: 'ethela',
        transferType: 'release',
        network: 'Kovan',
        networkID: 42,
        address: '0xf7184E6449a522988D65F794fa53DA44Eddd78Fd',
        confirmations: ETH_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    1: {
        symbol: 'ELA',
        name: 'Elastos',
        id: 'ela',
        transferType: 'mint',
        network: 'Elastos Testnet',
        networkID: 21,
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