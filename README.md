![shadowtokens_github](/src/assets/docs/banner.png)

ShadowTokens is a cross-chain bridge between Elastos and Ethereum, enabling users to transfer digital asset ownership information (ETH, ELA, and any ERC20, ERC677, or ERC827 tokens) from one chain to the other quickly and reliably. The objective of this bridge is two fold:

1. Provide another scaling option for Ethereum via Elastos's EVM-comptabile Smart Contract sidechain (negligible fees, secured by over 50% of Bitcoin's hashpower plus DPoS).
2. Enable Elastos to take full advantage of the tokens native to Ethereum, such as stablecoins, for use in DeFi applications (TokSwap, Quicksilver, etc.).

ShadowTokens plans to develop more bridges in the future to provide interoperability for isolated blockchains. The smart contracts for this application use the multi-token extension for the Arbitrary Message Bridge, which has been audited and used for a variety of existing bridges (xDai, POA). For more information about this implementation, please visit https://docs.tokenbridge.net/. 

## Visual Guide

This ShadowTokens interface is intended to be a user-friendly tool to map your assets between chains. A demonstration of moving ELA from Elastos to Ethereum and back is provided below. Please note that 'ELA' refers to ELA on the Elastos Smart Contract sidechain, not the Mainchain. If you need to fund the Smart Contract sidechain with ELA first, a tool for that is also available on Shadowtokens (see the end of this guide).

### Transfer ELA from Elastos to Ethereum

**1**. Visit https://tokbridge.net. Connect your web3 wallet (MetaMask or a WalletConnect compatible wallet that supports custom networks) to the Elastos network. If you have not yet configured the network, use the settings below to add the network.

![shadowtokens_github](/src/assets/docs/1.png)

Once connected, you will see your address populated in the header and your ELA balance displayed by the 'Max' button. You will notice two separate fields, the top one representing assets on the source network (Elastos), and the bottom one representing assets on the desination network (Ethereum). 

![shadowtokens_github](/src/assets/docs/2.png)

There are also icons labeled 'Lock', 'Release', 'Burn', and 'Mint'. These will change depending on which asset you select. In this case, ELA will be locked on the Elastos chain and its shadow token (ELA on Ethereum) will be minted on the Ethereum chain at a 1:1 ratio, as governed by the mediator smart contracts. When transferred back, the 'ELA on Ethereum' token will be burned and native ELA will be released to your address on the Elastos sidechain. This same principle applies to all asset transfers.

![shadowtokens_github](/src/assets/docs/3.png)


**2**. To proceed, enter the amount of ELA you wish to transfer to Ethereum. The minimum transfer is 1 ELA. Note that ELA functions as gas on the Elastos sidechain, so reserve some to pay the small transaction fees. When you enter a valid balance, the 'Next' button should activate. Click it.  

*Note: The destination address field is optional. This is for if you wish to bridge assets to an address other than the one you are already connected to. In most cases, this field can be skipped.*

![shadowtokens_github](/src/assets/docs/4.png)


**3**. Next, you will directed to a confirmation page. Ensure the details are correct and click 'Confirm'. 

*Note: Bridge mediator fees are presently only charged for ELA and ETH transfers on the return trip and are set at 0.1%.*

![shadowtokens_github](/src/assets/docs/5.png)


**4**. You should now be prompted to authorize the contract interaction in your wallet. The default gas price is fine and does not need to be changed, though you can increase it if you want a faster transaction. Confirm the transaction in your wallet. 

*Note: When transferring ELA and ETH, you do not need to approve an allowance. However, for ERC-20 tokens there will first be a spend authorization request to permit the smart contract to retrieve funds from the token contract, and then a second request for the actual bridge transfer.*

![shadowtokens_github](/src/assets/docs/6.png)


**5**. The interface will now display the transfer progress, which includes waiting for block confirmations on the source network and for the bridge oracles to validate the transaction and mint or release your assets on the destination chain. Once complete, the success message will pop up with a link to view the confirmed transaction on the destination chain's block explorer.. 

*Note: In some cases, the transfer may take longer than expected (>5 minutes) due to the fixed gas prices used by the bridge mediator. If this happens, please monitor the block explorer link provided. Your funds are safe and will eventually arrive.*

![shadowtokens_github](/src/assets/docs/7.png)


### Send ELA from Ethereum back to Elastos

You should now have some ELA in your wallet on the Ethereum chain. Switch your network in MetaMask to the Ethereum mainnet. The app should update to reflect your new balances on the chosen network.

![shadowtokens_github](/src/assets/docs/8.png)

To see the ELA that you minted on Ethereum, click the 'ETH' dropdown menu to open the default token list and select ELA.

*Note: You can also view the opposite bridge direction by clicking the swap icon in the middle, but you will need to switch your network before beginning a transfer. It will not auto-connect your wallet to the proper network.*

![shadowtokens_github](/src/assets/docs/9.1.png)

*Note: This is also where you can add custom tokens by pasting the token contract address in the search field.*

To return your ELA on Ethereum back to the Elastos Smart Contract chain, simply repeat the same process as above. You will now be burning the ELA token on Ethereum, and releasing your original ELA back to your account. Keep in mind that gas fees will be much higher when initiating a transfer from the Ethereum chain (and more confirmations are required), so plan accordingly.

![shadowtokens_github](/src/assets/docs/10.png)

That's it. You can now repeat this process to bridge any token between the Elastos and Ethereum ecosystems. Enjoy!





## How to Fund the Elastos Smart Contract Sidechain

The deposit and withraw tool may be found by toggling the switch in the toolbar (see the arrow picutured below).

### Deposit

To deposit ELA to the Smart Contract sidechain, send native ELA to the address provided by scanning the QR code or entering the address in your wallet of choice.

![shadowtokens_github](/src/assets/docs/sidechain_1.png)

*Note: This address is one time use. Do not send multiple payments to this address or you may risk losing your funds.*

It will take a few minutes for the deposit to be received and tracked by the interface. Once received, the next page will appear. There are no more actions required. Simply wait for the deposit to complete. It may take 10-15 minutes for larger transfers.

![shadowtokens_github](/src/assets/docs/sidechain_2.png)


### Withdraw

To withdraw ELA from the Smart Contract sidechain select the 'Withdraw' tab, enter the amount you want to withdraw from your MetaMask wallet, and the enter mainchain address where you want to receive your ELA. Click withdraw and you will be prompted to confirm the transaction.

![shadowtokens_github](/src/assets/docs/sidechain_3.png)

*Note: CryptoName is supported in the address field, so if you own one you can type it in the field to retrieve your address.*

That's it. Monitor the status field to view your withdrawal progress. 

![shadowtokens_github](/src/assets/docs/sidechain_4.png)
