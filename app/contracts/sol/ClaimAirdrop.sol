// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract ClaimAirdrop {
    IERC20 public token;
    uint256 public claimableAmount;

    mapping(address => bool) public isClaimed;

    constructor(IERC20 _token, uint256 _claimableAmount) {
        token = _token;
        claimableAmount = _claimableAmount;
    }

    function getBalance() public view returns(uint256) {
        return token.balanceOf(address(this));
    }

    function claim() external {
        require(!isClaimed[msg.sender], "You already claimed!");
        uint256 contractBalance = getBalance();
        require(claimableAmount <= contractBalance, "There is no token for claim!");
        isClaimed[msg.sender] = true;
        token.transfer(msg.sender, claimableAmount);
    }
}