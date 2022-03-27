// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721 {


    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 indexed tokenId); 

    mapping(uint256 => address) private _tokenOwner;

    mapping(address => uint256) private _OwnedTokensCount;

    function balanceOf(address _owner) public view returns(uint256) {
        require(_owner!=address(0),'Owner Query for nonexists token');
        return _OwnedTokensCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns(address){
        address owner = _tokenOwner[_tokenId];
        require(owner!=address(0),'Owner Query for nonexists token');

        return owner;
    }


    function _exists(uint256 tokenId) internal view returns(bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual
    {
        // require that the address isn't zero
        require(to!=address(0),'ERC721 : minting to the zero address');

        // require that the token does not already exist
        require(!_exists(tokenId),'ERC721 : token already minted');

        // add new address with a token id for minting
        _tokenOwner[tokenId] = to;
        // keepting track to each address that is minting and adding one to the count 
        _OwnedTokensCount[to] +=1;

        emit Transfer(address(0), to, tokenId);
    }


}