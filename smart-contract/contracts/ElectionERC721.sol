// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ElectionERC721 is ERC721URIStorage {
    uint256 ELECTION_TOKEN_ID;

    constructor() ERC721("CleverNFT", "CN") {}

    function mintNFT(
        address _user,
        string memory tokenURI
    ) public {
        _mint(_user, ELECTION_TOKEN_ID);
        _setTokenURI(ELECTION_TOKEN_ID, tokenURI);
        ELECTION_TOKEN_ID++;
    }
}
