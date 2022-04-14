# merkle-tree-js
Create proof and root values for a Merkle Tree whitelist for your NFT drop - saves time and gas fees.
We use it on www.envoverse.com for our whitelist sale, which we call VIP sale and that happens regularly.

See YouTube video here:
https://youtu.be/WQI_xo_QRsk

## install
`npm install`
the dependencies of the package.json

## formats and files
Needs a list of wallets (or strings for that matter) in VIPlist.json

## usage
Get the root (for the VIPlist.json text file) AND the proof for an allowed wallet by calling node this way:
`WALLET=0x0YOURWALLETSTRING12345 node createVIPvalues.js`

## note
Works with our smart contract for example:
https://github.com/envoverse/smart-contract-eth
on the ETH blockchain.

## credits:
Based on https://github.com/Qambar merkle-tree tutorial