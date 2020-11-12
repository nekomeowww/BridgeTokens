import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_HOME, MULTI_AMB_ERC_ERC_FEE_FOREIGN } from './config';
import WBTC_ICON from "../../../assets/wbtc.png";

export const WBTC = {
    0: {
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin',
        id: 'wbtc',
        destID: 'ethwbtc',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        confirmations: ETH_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_HOME,
    },
    1: {
        symbol: 'ethWBTC',
        name: 'Wrapped Bitcoin on Elastos',
        id: 'ethwbtc',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '', // generate on elastos
        confirmations: ELA_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: WBTC_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 88,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    maxTx: MULTI_AMB_ERC_ERC_MAX_TX,
    priceTicker: 'bitcoin',
    priceFeed: 'https://api.coincap.io/v2/assets/bitcoin',
}