// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

struct Hash {
    string value;
    bool exists;
}

contract Auditability {
    mapping(string => Hash) hashes;
    uint public hashesCount;

    function store(string memory id, string memory hash) public {
        require(!hashes[id].exists, "Id can not updated");
        hashes[id] = Hash(hash, true);
        hashesCount += 1;
    }

    function retrieve(
        string memory id
    ) public view returns (string memory) {
        require(hashes[id].exists, "Id not founded");
        return hashes[id].value;
    }
}
