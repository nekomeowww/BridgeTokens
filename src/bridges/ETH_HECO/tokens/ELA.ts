import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ELA_AMB_NATIVE_ERC_MIN_TX, ELA_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from './config';
import ELA_ICON from "../../../assets/ela.png"

export const ELA = {
    0: {
        symbol: 'ANT(Base)',
        name: 'ELA on Ethereum',
        id: 'ethela',
        transferType: 'mint',
        network: 'Heco Mainnet',
        networkShortName: 'heco',
        networkID: 128,
        address: '0x3d1a6da59d87e8fe650b959314fdec53e6da56f1',
        confirmations: ETH_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    1: {
        symbol: 'ANT',
        name: 'Elastos',
        id: 'ela',
        transferType: 'release',
        network: 'Binance Testnet',
        networkShortName: 'binanceTest',
        networkID: 97,
        address: '0xfE0b1b4bef7d1E43BE2B518e1A86dC07E17d997D',
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