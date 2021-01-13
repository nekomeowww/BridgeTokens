// Native coins
import { ETH } from './ETH'
import { ELA } from './ELA'

// Dev imports
import { ETH_DEV } from './ETH_DEV'
import { ELA_DEV } from './ELA_DEV'

export const ETH_DEFAULTS = [
    // Native coins
    ETH
]

export const ELA_DEFAULTS = [
    // Native coins
    ELA
]

///////////////////////////////////////////
/// Dev mode: Rinkeby and Elastos Testnet ///
///////////////////////////////////////////

export const ETH_DEV_DEFAULTS = [
    ETH_DEV,
    ELA_DEV,
]

export const ELA_DEV_DEFAULTS = [
    ELA_DEV,
    ETH_DEV,
]
