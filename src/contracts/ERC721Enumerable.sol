// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';

contract ERC721Enumerable is ERC721 {

    uint256[] private _allTokens;

    // mapping from tokenId to position in _allTokens array
    mapping(uint256=>uint256) private _allTokensIndex;

    // mapping of owner to list of all owner token IDs
    mapping(address=>uint256[]) private _ownedTokens;

    // mapping from tokenId to index of the owner tokens list
    mapping(uint256=>uint256) private _ownedTokensIndex;

    function _mint(address to, uint256 tokenId) internal override(ERC721)
    {
        super._mint(to,tokenId);
        // 2 things.
        // A. add tokens to the owner
        // B. all tokens to our totalSupply - to allTokens
        _addTokensToAllTokenEnumeration(tokenId); 
        _addTokensToOwnerEnumeration(to,tokenId);
    }

    // add tokens to the _allTokens array and set the position of the tokens indexes
    function _addTokensToAllTokenEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length; 
        _allTokens.push(tokenId);

    }

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        // 1. add address and token id to the _ownedTokens
        // 2. ownedTokensIndex tokenId set to address of ownedTokens position
        // 3. execute the function with minting
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);

    }

    /// @notice Count NFTs tracked by this contract
    /// @return A count of valid NFTs tracked by this contract, where each one of
    ///  them has an assigned and queryable owner not equal to the zero address


    function tokenByIndex(uint256 index) public view returns(uint256) 
    {
        require(index < totalSupply(),'Global index is out of bounds!');
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner, uint index) public view returns(uint256)
    {
        require(index < balanceOf(owner),'Global index is out of bounds!');
        return _ownedTokens[owner][index];
    }


    // return total supply of all tokens array
    function totalSupply() public view returns(uint256){
        return _allTokens.length;
    }

}
