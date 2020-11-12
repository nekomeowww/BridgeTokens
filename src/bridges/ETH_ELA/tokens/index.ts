// Native coins
import { ETH } from './ETH'
import { ELA } from './ELA'

// Tokens
import { DAI } from './DAI'
import { USDT } from './USDT'
import { USDC } from './USDC'
import { HFIL } from './HFIL'
// import { WBTC } from './WBTC'
import { BAT } from './BAT'
import { ELP } from './ELP'

// Dev imports
import { ETH_DEV } from './ETH_DEV'
import { ELA_DEV } from './ELA_DEV'
import { MAIN_DEV } from './MAIN_DEV'

export const ETH_DEFAULTS = [
    // Native coins
    ETH,
    // ERC20 tokens
    ELA,
    DAI,
    USDT,
    USDC,
    HFIL,
    BAT,
    ELP
]

export const ELA_DEFAULTS = [
    // Native coins
    ELA,
    // ERC20 tokens
    ETH,
    DAI,
    USDT,
    USDC,
    HFIL,
    BAT,
    ELP
]

///////////////////////////////////////////
/// Dev mode: Kovan and Elastos Testnet ///
///////////////////////////////////////////

export const ETH_DEV_DEFAULTS = [
    ETH_DEV,
    ELA_DEV,
    MAIN_DEV,
]

export const ELA_DEV_DEFAULTS = [
    ELA_DEV,
    ETH_DEV,
    MAIN_DEV,
]
