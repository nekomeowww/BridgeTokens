import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ELA_AMB_NATIVE_ERC_MIN_TX, ELA_AMB_NATIVE_ERC_MAX_TX, AMB_NATIVE_ERC_FEE_HOME, AMB_NATIVE_ERC_FEE_FOREIGN } from './config';
import ELA_ICON from "../../../assets/ela.png"

export const ELA = {
    0: {
        symbol: 'ANT (From)',
        name: 'EarnDefiCoin',
        id: 'ethela',
        transferType: 'mint',
        network: 'Heco Mainnet',
        networkShortName: 'heco',
        networkID: 128,
        address: '0x68a0a1fef18dfcc422db8be6f0f486dea1999edc',
        confirmations: ETH_CONFIRMATIONS,
        fee: AMB_NATIVE_ERC_FEE_FOREIGN,
    },
    1: {
        symbol: 'EDC (To)',
        name: 'EarnDefiCoin',
        id: 'ela',
        transferType: 'release',
        network: 'Ethereum',
        networkShortName: 'ethereum',
        networkID: 1,
        address: '0x68a0a1fef18dfcc422db8be6f0f486dea1999edc',
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