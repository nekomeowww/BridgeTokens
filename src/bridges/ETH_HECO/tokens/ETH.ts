import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ETH_AMB_NATIVE_ERC_MIN_TX, ETH_AMB_NATIVE_ERC_MAX_TX } from './config';
import ETH_ICON from "../../../assets/eth.png";

export const ETH = {
    0: {
        symbol: 'EDC (From)',
        name: 'EarnDefiCoin',
        id: 'eth',
        transferType: 'mint',
        network: 'Ethereum',
        networkShortName: 'ethereum',
        networkID: 1,
        address: '0x68a0a1fef18dfcc422db8be6f0f486dea1999edc', // 起始位置转账调用的合约，比如从 Binance 出发
        confirmations: ETH_CONFIRMATIONS,
        fee: 0,
    },
    1: {
        symbol: 'EDC (To)',
        name: 'EarnDefiCoin',
        id: 'huobi',
        transferType: 'release',
        network: 'Heco Mainnet',
        networkShortName: 'heco',
        networkID: 128,
        address: '0x68a0a1fef18dfcc422db8be6f0f486dea1999edc', // 抵达位置转账调用的合约，可以不填
        confirmations: ELA_CONFIRMATIONS,
        fee: 0,
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