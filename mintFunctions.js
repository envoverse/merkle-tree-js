// Our javascript example collection to talk to our smart contract
// on envoverse.com
// IMPORTANT: set your own INFURA ID in line: 267
// -----------------------------------------------------------------

// we go global, because we keep it simple
var web3 = false;

var activeWallet = "";
var myContract = "";

var contractInstance = null;

// RINKEBY - use your own contract, please
var contractAddr = "0x61C3DA9f5d3Cf4D5f5CF5338311988251eA4F622"; // TEST RINKEBY
var myABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_initBaseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"mintedEnvo","type":"event"},{"inputs":[],"name":"ENVOSAVAIL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_ENVOS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_VIPWA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_VIPWAUNLOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RES_ENVOS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VIPMerkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VIP_ENVOS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"merkleArr","type":"bytes32[]"}],"name":"VIPmint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressMintedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseExtension","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newTotal","type":"uint256"}],"name":"changeReserved","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractCreator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"myNumber","type":"uint256"}],"name":"giveRightNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"restingDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newEndTimestamp","type":"uint256"}],"name":"setEndDate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newEndDonation","type":"uint256"}],"name":"setEndDonation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"merkleArr","type":"bytes32[]"}],"name":"setMerkleProof","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRestingDonation","type":"uint256"}],"name":"setRestingDonation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newStartTimestamp","type":"uint256"}],"name":"setStartDate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newStartDonation","type":"uint256"}],"name":"setStartDonation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newVIPTimestamp","type":"uint256"}],"name":"setVIPDate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newVIPDonation","type":"uint256"}],"name":"setVIPDonation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"merkleRoot","type":"bytes32"}],"name":"setVIPMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newVIPTimestamp","type":"uint256"}],"name":"setVIPUnlockDate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"showBCtime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"showCurrentDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"showVIPproof","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vipCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vipDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vipDateUnlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vipDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"withdrawAllToAddress","outputs":[],"stateMutability":"nonpayable","type":"function"}];

var activePrice = 220000000000000000;
var activeGas = "";
var chainId = "";
var vipPrice = 110000000000000000;
var myProof = [];
var tokenCounter = 0;
var transactionStatus = "";
var currentId = 269;
var BCtime = 0;

// -----------------------------------------------------------------------------------------------------
// call mint
function startMint() {
    if(web3 === false) {
        alert("No wallet connected, please connect a wallet!");
        connectProvider();
        return;
    }

    if(contractInstance === undefined || contractInstance === null) {
        alert("No wallet connected, please connect a wallet!");
        connectProvider();
        return;
    }

    var sendPrice = (parseInt(activePrice) * parseInt($("#mintAmount").val())).toString();
    tokenCounter = 0;
    contractInstance.methods.mint(activeWallet, parseInt($("#mintAmount").val())).send({from: activeWallet, value: sendPrice, gasPrice: parseInt(activeGas * 1.25)})
        .on('transactionHash', function(hash){
            console.log("Hash: ");
            console.log(hash);
            transactionStatus="Transaction <B>placed</B> on the chain, waiting for update: " + hash +"<BR>\n" + "<B>IF YOU ARE CONNECTING A MOBILE WALLET, PLEASE WATCH THAT SCREEN!</B>";
            transactionPlaced();
            $("#walletStatus").html('<img src="assets/envoLoading.gif">'+"<BR>\n"+"SENDING TO BLOCKCHAIN - Please wait!");

        })
        .on('receipt', function(receipt){
            console.log("Receipt: ");
            console.log(receipt);
            transactionStatus="Transaction <B>received</B> by chain, waiting for update." + "<BR>\n" + "<B>IF YOU ARE CONNECTING A MOBILE WALLET, PLEASE WATCH THAT SCREEN!</B>";
            transactionPlaced();
            $("#walletStatus").html('<img src="assets/envoLoading.gif">'+"<BR>\n"+"BLOCKCHAIN PROCESSING - Please wait!");
        })
        .on('confirmation', function(confirmationNumber, receipt){
            console.log("Confirmation: / Receipt: ");
            console.log(confirmationNumber);
            console.log(receipt);
            transactionStatus="";
            $("#walletStatus").html("Transaction <B>confirmed</B> by chain: <a href='https://etherscan.io/tx/" + receipt.transactionHash + "'>Show on Etherscan</a>");
            if(!isMobile) {
                if(tokenCounter<1) {
                    importToken(currentId);
                    tokenCounter++;
                }
                transactionStatus="";
            }
            calcMintValue();
            balanceof();
            totalsupply();
            mintSuccess(receipt);
        })
        .on('error', function(error, receipt) {
            console.log("Error: / Receipt: ");
            console.log(error);
            console.log(receipt);
            transactionStatus="";
            $("#walletStatus").html("ERROR: Something went wrong!");
            $("#walletStatus").append("<BR>STOPPED - Not enough funds or cancelled?");
        });
}
// -----------------------------------------------------------------------------------------------------
// call VIPmint
function startVIPmint() {
    if(web3 === false) {
        alert("No wallet connected, please connect a wallet!");
        connectProvider();
        return;
    }

    if(contractInstance === undefined || contractInstance === null) {
        alert("No wallet connected, please connect a wallet!");
        connectProvider();
        return;
    }

    $.getJSON( "getProof.php?wallet=" + activeWallet, function( data ) {
        var items = [];
        tokenCounter = 0;
        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + key + ": " + val + "</li>" );
        });

        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "#verifyWallet" );

        myProof = data.PROOF;

        console.log("proof: ",myProof);

        contractInstance.methods.VIPmint(myProof).send({from: activeWallet, value: vipPrice, gasPrice: parseInt(activeGas * 1.1)})
            .on('transactionHash', function(hash){
                console.log("Hash: ");
                console.log(hash);
                transactionStatus="VIP Transaction <B>placed</B> on the chain, waiting for update: " + hash +"<BR>\n" + "<B>IF YOU ARE CONNECTING A MOBILE WALLET, PLEASE WATCH THAT SCREEN!</B>";
                transactionPlaced();
                $("#currentBalance").html('<img src="assets/envoLoading.gif">'+"<BR>\n"+"SENDING TO BLOCKCHAIN - Please wait!");
            })
            .on('receipt', function(receipt){
                console.log("Receipt: ");
                console.log(receipt);
                transactionStatus="VIP Transaction <B>received</B> by chain, waiting for update...";
                transactionPlaced();
                $("#currentBalance").html('<img src="assets/envoLoading.gif">'+"<BR>\n"+"BLOCKCHAIN PROCESSING - Please wait!");
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log("Confirmation: / Receipt: ");
                console.log(confirmationNumber);
                console.log(receipt);
                transactionStatus="";
                $("#WalletStatus").html("Transaction <B>confirmed</B> by chain: <a href='https://etherscan.io/tx/" + receipt.transactionHash + "'>Show on Etherscan</a>");

                if(!isMobile) {
                    if(tokenCounter<1) {
                        importToken(currentId);
                        tokenCounter++;
                    }
                }
                transactionStatus="";

                calcMintValue();
                balanceof();
                totalsupply();
                mintSuccess(receipt);
            })
            .on('error', function(error, receipt) {
                transactionStatus="";
                console.log("Error: / Receipt: ");
                console.log(error);
                console.log(receipt);
                $("#WalletStatus").html("VIP ERROR: Something went wrong!");
                $("#currentBalance").html("STOPPED - Not enough funds or cancelled?");
            });

    });
}
// -----------------------------------------------------------------------------------------------------
// get the complete value of a mint (amount * value of 1)
function calcMintValue() {
    var myAmount = mintValue;
    if(myAmount < 1) {
        $("#mintAmount").val(1);
        return;
    }
    var currVal = web3.utils.fromWei((myAmount * activePrice).toString(), 'ether');
    currVal = roundUp(currVal, 3);
    console.log(currVal + " ETH + gas fees");
}
// -----------------------------------------------------------------------------------------------------
// functions for status updates
function transactionPlaced() {
    var d = new Date();
    var myTime = d.toLocaleTimeString();
    if(transactionStatus.length > 12) {
        $("#WalletStatus").html(myTime + " - " + transactionStatus);
        window.setTimeout(transactionPlaced, 1000);
    }
}
// -----------------------------------------------------------------------------------------------------
// functions for status updates
function callMintCounterUpdate(latestId) {
    $.getJSON("wlcheck.php?w=" + activeWallet + "&tur=" + tur, function (data) {
        if (data.ANZ > 0) {

        }
    });
}
// -----------------------------------------------------------------------------------------------------
// functions for status updates
function mintSuccess(resultJson) {
    // mintDetails => shows details
    // carouselMultipleColumns => hide
    // currentBalance, metaHint => hide

    $("#carouselMultipleColumns").hide();
    $("#currentBalance").hide();
    $("#metaHint").hide();
    $("#mintVIPdetails").hide();

    var myHtml = "";
    var e = 0 ;
    var tokids = "",

        myHtml = "<h2>Success - Thank you!</h2>\n";1

    if(Array.isArray(resultJson.events.mintedEnvo)) {
        for(e=0; e < resultJson.events.mintedEnvo.length; e++) {
            myHtml = myHtml + "# " + resultJson.events.mintedEnvo[e].returnValues.id.toString() + " was transferred to your wallet!<BR>\n<BR>\n";
            if(tokids.length > 0) {
                tokids = tokids + ",";
            }
            tokids = tokids + resultJson.events.mintedEnvo[e].returnValues.id.toString();
        }
    } else {
        myHtml = myHtml + "# " + resultJson.events.mintedEnvo.returnValues.id.toString() + " was transferred to your wallet!<BR>\n<BR>\n";
        tokids = tokids + resultJson.events.mintedEnvo.returnValues.id.toString();
    }

    myHtml = myHtml + '<B>Please leave your e-mail address to get DAO notifications:</B> (if you like)' + "<BR>\n";
    myHtml = myHtml + '<form action="#" id="walletmail">';
    myHtml = myHtml + '<input type="email" id="mymail" name="mymail" style="font-size: 1.2em; padding: 3px;" placeholder="your@email.com">' + "<BR>\n";
    myHtml = myHtml + '<input type="button" class="btn btn-primary" onclick="mintWalletMail();" value="Save my eMail"></form>' + "<BR>\n<BR>\n";

    myHtml = myHtml + 'Transaction: <a href="' + resultJson.transactionHash + '" target="_blank">View on Etherscan</a>' + "<BR>\n<BR>\n";
    myHtml = myHtml + '<B>Go to <a href="https://opensea.io/" target="_blank">OpenSea.io and connect</a> your wallet to see your ENVO(s)!</b>' + "<BR>\n<BR>\n";
    myHtml = myHtml + '<a href="#" onclick="window.location.reload(); return false;">Start again?</a>' + "<BR>\n<BR>\n";

    $("#mintDetails").html(myHtml);

    $.getJSON( "wlcheck.php?w=" + activeWallet + "&tur=" + tur +"&tokids=" + tokids, function( data ) {
        if (data.INWAL > 1) {
            console.log("User has " + data.INWAL + " ENVOS already.");
            // maybe limit calls per minute?
        }
    });

}
// --------------------------------------------------------------------------------
function mintWalletMail() {
    usrMail = $("#mymail").val();

    $.getJSON( "wlcheck.php?w=" + activeWallet + "&tur=" + tur +"&m=" + encodeURI(usrMail), function( data ) {
        if (data.MESSAGE.length > 1) {
            alert(data.MESSAGE);
        }
    });
}
//
async function connectProvider() {
    if (typeof window.ethereum !== 'undefined') {
        console.log("yes, wallet there");
        ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        checkWallet();
    } else {
        // metamask not available, lets get another provider
        console.log("No provider :-(");
        var provider = new WalletConnectProvider.default({
            infuraId: "YOUROWNID",
        });
        //to set it to BSC, uncomment the following line
        //provider.chainId = 56;
        //present the Wallet Connect QR code
        provider.enable().then(function(res){
            //get wallet addrs and then wrap this into the Web3 JS
            web3 = new Web3(provider);
            checkWallet();
            //now do all the web3 stuff you want...
            //awesome web3 application goes here
        });
    }
    return;
}
// -----------------------------------------------------------------------------------------------------
// check and connect wallet
async function checkWallet() {
    if(web3 === false) {
        await connectProvider();
    }
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
        activeWallet = accounts[0];
    }
    //console.log(accounts[0]);
    if(typeof window.ethereum !== 'undefined') {
        if (ethereum.isConnected()) {
            var isMM = ethereum.isMetaMask;
            if (isMM) {
                console.log("yes - MM installed");
            } else {
                console.log("no - MM missing");
            }
            console.log("yes");
            console.log("Wallet Found");
            // web3 = new Web3(window.ethereum);
        }
    }
    if(activeWallet.length > 12) {
        console.log(activeWallet);
        console.log("<B>Status:</B> Account found, you are well prepared. Make sure the network is the Mainnet!");
        if(chainId == 0x1) {
            console.log("<B>Status:</B> Account found, you are well prepared. You can mint right away!");
        }
        //$("#verifyWallet").load("verify.php?tur="+ tur +"&w=" + activeWallet);
    } else {
        $("#walletStatus").html("<B>CAN NOT READ YOUR WALLET ID, something is wrong!</B><BR>\n<B style='color: #AA0000;'>Please connect your Metamask-compatible wallet</B>");
    }

    // where are we?
    showNetwork(chainId);

    // metamask is there!
    if(typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', function (accounts) {
            activeWallet = accounts[0];
            $("#walletStatus").html("Wallet account changed - Account: " + activeWallet);
            location.reload();
        });
        window.ethereum.on('chainChanged', function (networkId) {
            chainId = ethereum.request({method: 'eth_chainId'});
            showNetwork();
        });
    }
    // found a wallet
    if(activeWallet.length > 5) {
        $("#walletStatus").html(activeWallet);
        $("#walletStatus").html("<B>Status:</B> Account found, you are well prepared. Make sure the network is the Mainnet!");

        readContract();

        if(chainId == 0x1) {
            $("#walletStatus").html("<B>Status:</B> Account found, you are well prepared. You could mint right away - stay tuned for updates!");
        }
        $("#walletStatus").load("verify.php?tur="+ tur +"&w=" + activeWallet);
        $("#walletStatus").html("Wallet: " + activeWallet.substring(0,5)+"..."+activeWallet.substring(activeWallet.length - 5));
    } else {
        $("#walletStatus").html("NO WALLET FOUND!");
    }
    //
    $("#walletStatus").html(contractAddr);
}
// -----------------------------------------------------------------------------------------------------
// Set and log network ID - 4 = rinkeby, 1 = mainnet
async function showNetwork() {
    /*
    0x1	1	Ethereum Main Network (Mainnet)
    0x3	3	Ropsten Test Network
    0x4	4	Rinkeby Test Network
    0x5	5	Goerli Test Network
    0x2a	42	Kovan Test Network
     */
    chainId = await web3.eth.getChainId();
    if(chainId == 0x1) { $("#walletStatus").html("Ethereum Main"); }
    if(chainId == 0x3) { $("#walletStatus").html("Ropsten Testnetwork"); }
    if(chainId == 0x4) { $("#walletStatus").html("Rinkeby Testnetwork"); }
    if(chainId == 0x5) { $("#walletStatus").html("Goerli Testnetwork"); }
    if(chainId == 0x2a) { $("#walletStatus").html("Kovan Testnetwork"); }

    if(chainId != 0x1) {
        $("#walletStatus").html("<B style='font-size: 0.9em;'>Hint: YOU ARE NOT on the Mainnet of ETH!</B>");
    }
}
// -----------------------------------------------------------------------------------------------------
// prepare contract interaction with wallet: mint!
async function readContract() {
    contractInstance = new web3.eth.Contract(myABI, contractAddr);

    contractInstance.methods.showCurrentDonation().call({from: activeWallet}, function(err, result) {
        if(! err) {
            activePrice = result.toString();
            //alert(activePrice);

            $("#mint-total").html(web3.utils.fromWei(result, 'ether')+ " ETH");
            $("#publicDonation").val(activePrice);

            web3.eth.getGasPrice().then((result) => {
                activeGas = result.toString();
                console.log("Gas estimate: " + activeGas);

                //$("#walletStatus").html(web3.utils.fromWei(result, 'ether') + " ether ("+activeGas+")");
            });

            calcMintValue();

            // check if wallet is on VIPlist
            // live on chain check
            $.getJSON( "wlcheck.php?w=" + activeWallet + "&tur=" + tur, function( data ) {
                if(data.ANZ > 0) {
                    contractInstance.methods.vipCounter().call({from: activeWallet}, function(err, result) {
                        console.log("VIP count: ", result);
                        var vipCount = result;
                        contractInstance.methods.showBCtime().call({from: activeWallet}, function(err, result) {
                            var BCtime = result;
                            if((BCtime > 1649844000 && BCtime < 1650016800)) {  // bigger VIPdate and smaller StartDate
                                if (0 + parseInt(vipCount) < 555) {
                                    //$("#mintVIPdetails").show();
                                    //$("#spotsVIP").html(vipCount + " of 555 gone. (delays of 25 seconds!)");
                                    if(BCtime < 1650016800) {
                                        $("#walletStatus").html("<B style='font-size: 0.9em;'>Current limit 1 ENVO per VIP wallet still in play! Means: a VIP can only buy one.</B>");
                                    }
                                } else {
                                    $("#walletStatus").html("<B style='font-size: 0.9em;'>All VIP spots have been sold out!</B>");
                                }
                            } else {
                                console.log("VIP sale not accessible right now!");
                            }
                        });
                    });
                }
            });
        } else {
            alert(err);
        }

    });
    // balance + total supply calls
    balanceof();
    totalsupply();
}
// -----------------------------------------------------------------------------------------------------
// get totally minted ENVOS (totalSupply) and ENVOS in user wallet
async function totalsupply() {
    contractInstance.methods.totalSupply().call({from: activeWallet}, function(err, result) {
        console.log(result);
        if(0+parseInt(result) > 0) {
            currentId = 0 + parseInt(result) + 1;
            console.log("ENVO #" + currentId.toString());
            $.getJSON( "wlcheck.php?w=" + activeWallet + "&tur=" + tur +"&supply="+currentId.toString(), function( data ) {
                if (data.INWAL > 1) {
                    console.log("User has " + data.INWAL + " ENVOS already.");
                    // maybe limit calls per minute?
                }
            });
            //buildEnvoSlider();
        } else {
            $("#walletStatus").html("Your wallet is NOT connected right. Please manually connect to this site and reload!");
        }
    });
}
// -----------------------------------------------------------------------------------------------------
// JS to get the balance of the user
async function balanceof() {
    contractInstance.methods.balanceOf(activeWallet).call({from: activeWallet}, function(err, result) {
        console.log(result);
        if(0+parseInt(result) > 0) {
            var currentBalance = 0 + parseInt(result);
            console.log("(You have " + currentBalance.toString() +" ENVOs)");
            //$("#currentBalance").show();
        } else {
            //$("#currentBalance").hide();
        }
    });
}
// -----------------------------------------------------------------------------------------------------
// add a token you own to your metamask
async function importToken(nowId) {
    var tokenAddress = contractAddr;
    var tokenSymbol = 'ENVO';
    var tokenDecimals = 0;
    var tokenImage = 'https://envoverse.com/assets/img/envo_logo.png';

    var idc = nowId + 1;
    if(idc>10000) {
        idc = 1;
    }
    myDir = idc.toString().substring(idc.toString().length - 1);
    tokenImage = "https://www.envoverse.com/envo.php/thumb/" + myDir + "/envo" + idc.toString() + ".png";

    if(tokenCounter < 1) {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            tokenCounter++;
            var wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                transactionStatus="";
            } else {
                console.log('Not added!');
            }
        } catch (error) {
            console.log(error);
        }
    }
}
