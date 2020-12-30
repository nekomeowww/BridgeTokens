import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_HOME, MULTI_AMB_ERC_ERC_FEE_FOREIGN } from './config';
import HFIL_ICON from "../../../assets/hfil.png";

export const HFIL = {
    0: {
        symbol: 'HFIL',
        name: 'Huobi Filecoin',
        id: 'hfil',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '0x9afb950948c2370975fb91a441f36fdc02737cd4',
        confirmations: ETH_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_HOME,
    },
    1: {
        symbol: 'ethHFIL',
        name: 'Huobi Filecoin on Elastos',
        id: 'ethhfil',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '0x8deff781d4f3491e54fb7b4b8c61400681becaa0',
        confirmations: ELA_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: HFIL_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    maxTx: MULTI_AMB_ERC_ERC_MAX_TX,
    priceTicker: 'fil',
    priceFeed: 'https://api.coincap.io/v2/assets/filecoin',
}