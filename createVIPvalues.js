//
const process = require( 'process' );
// Prepping the list of VIPs into a Merkle tree
// Create the VIP list
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

// read the json file with wallets
const VIPAddresses = require('./VIPlist.json');

// mapreduce it
const VIPAddressesNodes = VIPAddresses.map((addr) => keccak256(addr));

// Build the tree
const VIPTree = new MerkleTree(VIPAddressesNodes, keccak256, {sortPairs: true});
const VIPRootHash = VIPTree.getHexRoot();

// get caller wallet
var MYWALLET = process.env.WALLET;
// console.log(MYWALLET);

// Print the summary and values for the contract
console.log("{");
console.log('   "ROOT": ' + '"'  + VIPRootHash + '"' + ",");
console.log('   "Wallet": ' + '"' + MYWALLET + '"' + "," );

const hashedAddress = keccak256(MYWALLET);
const myProof = VIPTree.getHexProof(hashedAddress);

console.log('   "PROOF": ' + '["'+myProof.join('","')+'"]');
console.log("}");