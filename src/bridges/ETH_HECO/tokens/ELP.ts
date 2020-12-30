import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_HOME, MULTI_AMB_ERC_ERC_FEE_FOREIGN } from './config';
import ELP_ICON from "../../../assets/elp.png";

export const ELP = {
    0: {
        symbol: 'elaELP',
        name: 'Elaphant on Ethereum',
        id: 'elaelp',
        transferType: 'release',
        network: 'Ethereum',
        networkID: 1,
        address: '0x9A086C09C42D57C08ec8d4E933FE21b35Ce943b1',
        confirmations: ETH_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_FOREIGN,
    },
    1: {
        symbol: 'ELP',
        name: 'Elaphant',
        id: 'elp',
        transferType: 'mint',
        network: 'Elastos',
        networkID: 20,
        address: '0x677d40ccc1c1fc3176e21844a6c041dbd106e6cd',
        confirmations: ELA_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_HOME,
    },
    home: 1,
    foreign: 0,
    icon: ELP_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 8,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    maxTx: MULTI_AMB_ERC_ERC_MAX_TX,
    priceTicker: 'elp',
    priceFeed: '',
}