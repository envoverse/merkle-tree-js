<?php
// calls the node tool and returns JSON

header("Content-type: application/json; charset=utf-8");

$myWallet = $_REQUEST["wallet"];
$myWallet = preg_replace("/[^a-zA-Z0-9\-_]+/", "", $myWallet);

# chdir("tools/");

exec('WALLET='.($myWallet).' node createVIPvalues.js', $output, $resultCode);

$jsonString = implode(" ", $output);

print $jsonString;

//$proofArr = json_decode($jsonString, true);
//print_r($proofArr);