// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Auditability {
    mapping(string => bool) hashes;
    uint public hashesCount;

    function storeHash(string memory hash) public {
        hashes[hash] = true;
        hashesCount += 1;
    }

    function recoverHash(string memory hash) public view returns (bool) {
        return hashes[hash];
    }
}
