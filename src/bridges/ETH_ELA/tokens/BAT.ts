import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, MULTI_AMB_ERC_ERC_MIN_TX, MULTI_AMB_ERC_ERC_MAX_TX, MULTI_AMB_ERC_ERC_FEE_HOME, MULTI_AMB_ERC_ERC_FEE_FOREIGN } from './config';
import BAT_ICON from "../../../assets/bat.png";

export const BAT = {
    0: {
        symbol: 'BAT',
        name: 'Basic Attention Token',
        id: 'bat',
        transferType: 'mint',
        network: 'Ethereum',
        networkID: 1,
        address: '0xffae1f0464a2ff332c1efe72a83a078bf247514f',
        confirmations: ETH_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_HOME,
    },
    1: {
        symbol: 'ethBAT',
        name: 'Basic Attention Token on Elastos',
        id: 'ethbat',
        transferType: 'release',
        network: 'Elastos',
        networkID: 20,
        address: '0x7f6a3ca020ca59174d7c677979c5ba4bb447fbab',
        confirmations: ELA_CONFIRMATIONS,
        fee: MULTI_AMB_ERC_ERC_FEE_FOREIGN,
    },
    home: 0,
    foreign: 1,
    icon: BAT_ICON,
    bridgeMode: 'multi_amb_erc_erc',
    decimals: 18,
    minTx: MULTI_AMB_ERC_ERC_MIN_TX,
    maxTx: MULTI_AMB_ERC_ERC_MAX_TX,
    priceTicker: 'bat',
    priceFeed: 'https://api.coincap.io/v2/assets/basic-attention-token',
}