<?php
// calls the node tool and returns JSON
// this is for PHP minting pages, that will not use the
// merkle tree routine in JS, but wants to work from PHP
// www.envoverse.com - Easter bunny 2022

header("Content-type: application/json; charset=utf-8");

$myWallet = $_REQUEST["wallet"];
$myWallet = preg_replace("/[^a-zA-Z0-9\-_]+/", "", $myWallet);

# chdir("tools/");

exec('WALLET='.($myWallet).' node createVIPvalues.js', $output, $resultCode);

$jsonString = implode(" ", $output);

print $jsonString;
