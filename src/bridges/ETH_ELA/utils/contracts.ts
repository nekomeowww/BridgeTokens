
export const MEDIATOR_CONTRACTS: any = {
    bridgeMode: {
        multi_amb_erc_erc: {
            'Ethereum': {
                release: '0xe6fd75ff38Adca4B97FBCD938c86b98772431867',  // Foreign, Elastos
                mint: '0xfBec16ac396431162789FF4b5f65F47978988D7f',  // Home, Ethereum
            },
            'Elastos': {
                release: '0x6Ae6B30F6bb361136b0cC47fEe25E44B7d58605c', // Foreign, Ethereum
                mint: '0x0054351c99288D37B96878EDC2319ca006c8B910', // Home, Elastos
            },
            'Kovan': {
                release: '0xf12d52246e86bbE26702aDe133262f94235507C6',  // Foreign, Elastos Testnet
                mint: '0xdCec1ca391101Db066e6819E9D50E2E688906717',  // Home, Kovan
            },
            'Elastos Testnet': {
                release: '', // Foreign, Kovan
                mint: '', // Home, Elastos Testnet
            }
        },
        amb_native_erc: {
            'Ethereum': {
                release: '0x314dfec1Fb4de1e0Be70F260d0a065E497f7E2eB',  // Foreign, Elastos
                mint: '0xf127003ea39878EFeEE89aA4E22248CC6cb7728E',  // Home, Ethereum
            },
            'Elastos': {
                release: '0x88723077663F9e24091D2c30c2a2cE213d9080C6', // Foreign, Ethereum
                mint: '0xE235CbC85e26824E4D855d4d0ac80f3A85A520E4', // Home, Elastos
            },
            'Kovan': {
                release: '0x385d2C9291f7354bc54237DE26d0352eF651b797', // Foreign, Elastos Testnet 
                mint: '0x155f3c04d64B39BC756a14A1d017d9295D23F61b', // Home, Kovan
            },
            'Elastos Testnet': {
                release: '', // Foreign, Kovan
                mint: '', // Home, Elastos Testnet
            }
        }
    }

}