// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JingweiFungibleToken.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";

contract Jingwei {

    event NftLocked(address token, uint256 tokenId);
    event NftReleased(address token, uint256 tokenId);
    event JftCreated(address token, address jft, uint256 jftLength);

    address[] public allJfts;
    mapping(address => address) public getJft;

    function getJftsLength() external view returns (uint256) {
        return allJfts.length;
    }

    function lockNFT(address token, uint256 tokenId) external {
        require(token != address(0), 'Jingwei: ZERO_ADDRESS');
        require(getJft[token] != address(0), 'Jingwei: JFT_NOT_EXISTS');
        IERC721(token).transferFrom(msg.sender, address(this), tokenId);
        JingweiFungibleToken(getJft[token]).mint(msg.sender, 10000 ether);
        emit NftLocked(token, tokenId);
    }

    function releaseNFT(address token, uint256 tokenId) external {
        require(token != address(0), 'Jingwei: ZERO_ADDRESS');
        require(getJft[token] != address(0), 'Jingwei: JFT_NOT_EXISTS');
        IERC721(token).transferFrom(address(this), msg.sender, tokenId);
        JingweiFungibleToken(getJft[token]).burn(msg.sender, 10000 ether);
        emit NftReleased(token, tokenId);
    }

    function createJFT(address token) external returns (address jft) {
        require(token != address(0), 'Jingwei: ZERO_ADDRESS');
        require(getJft[token] == address(0), 'Jingwei: JFT_EXISTS');
        bytes memory bytecode = type(JingweiFungibleToken).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token));
        assembly {
            jft := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        JingweiFungibleToken(jft).initialize(IERC721Metadata(token).name(), IERC721Metadata(token).symbol());
        getJft[token] = jft;
        allJfts.push(jft);
        emit JftCreated(token, jft, allJfts.length);
    }
}