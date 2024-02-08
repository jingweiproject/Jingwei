// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JingweiFungibleToken is Ownable, ERC20{
    
    event Mint(address account, uint256 value);
    event Burn(address account, uint256 value);

    string private _name;
    string private _symbol;
    bool private _initialized = false; 

    constructor() ERC20('JingweiFungibleToken', 'JFT') {
    }

    function initialize(
        string memory name_,
        string memory symbol_) external {
        require(!_initialized, 'JingweiFungibleToken: HAS_BEEN_INITIALIZED');
        _name = name_;
        _symbol = symbol_;
        _initialized = true;
    }

    function mint(address account, uint256 value) public onlyOwner{
        _mint(account, value);
        emit Mint(account, value);
    }

    function burn(address account, uint256 value) public onlyOwner {
        _burn(account, value);
        emit Burn(account, value);
    }

     function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }
}