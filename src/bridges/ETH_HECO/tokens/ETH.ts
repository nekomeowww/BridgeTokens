import { ETH_CONFIRMATIONS, ELA_CONFIRMATIONS, ETH_AMB_NATIVE_ERC_MIN_TX, ETH_AMB_NATIVE_ERC_MAX_TX } from './config';
import ETH_ICON from "../../../assets/eth.png";

export const ETH = {
    0: {
        symbol: 'ANT(From)',
        name: 'EDC on ETH',
        id: 'eth',
        transferType: 'mint',
        network: 'Binance Testnet',
        networkShortName: 'binanceTest',
        networkID: 97,
        address: '0xfE0b1b4bef7d1E43BE2B518e1A86dC07E17d997D', // 起始位置转账调用的合约，比如从 Binance 出发
        confirmations: ETH_CONFIRMATIONS,
        fee: 0,
    },
    1: {
        symbol: 'ANT(To)',
        name: 'EarnDefiCoin',
        id: 'huobi',
        transferType: 'release',
        network: 'Heco Mainnet',
        networkShortName: 'heco',
        networkID: 128,
        address: '0x3d1a6da59d87e8fe650b959314fdec53e6da56f1', // 抵达位置转账调用的合约，可以不填
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