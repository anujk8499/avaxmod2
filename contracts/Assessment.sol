// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract AnujKumarWallet {
    address payable public OwnerAddress;
    uint256 public Balance;
    uint256 public password;

    event DepositEvent(uint256 amount);
    event WithdrawEvent(uint256 amount);
    event PurchaseNFTEvent(uint256 _number);

    constructor(uint initailBalance) payable {
        OwnerAddress = payable(msg.sender);
        Balance = initailBalance;
        password = 1024;
    }

    function getBalance() public view returns (uint256) {
        return Balance;
    }

    function DepositToken(uint256 amt, uint256 passkey) public payable {
        uint256 prevBal = Balance;
        require(msg.sender == OwnerAddress, "You don't own this account.");
        require(passkey == password, "passkey doesn't match");

        Balance += amt;

        assert(Balance == prevBal + amt);
        emit DepositEvent(amt);
    }

    // custom error
    error InsufficientBalance(uint256 Balance, uint256 Amount);

    function WithdrawToken(uint256 amt, uint256 passkey) public {
        require(msg.sender == OwnerAddress, "You are not authorized");
        require(passkey == password, "passkey doesn't match");

        uint256 prevBal = Balance;
        if (Balance < amt) {
            revert InsufficientBalance({Balance: Balance, Amount: amt});
        }

        // WithdrawToken the given amount
        Balance -= amt;

        // assert the Balance is correct
        assert(Balance == (prevBal - amt));

        // emit the event
        emit WithdrawEvent(amt);
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function getContractBalance() public view returns (uint256) {
        return Balance;
    }

    function purchaseNFT(uint256 amt, uint256 passkey) public {
        WithdrawToken(amt, passkey);

        emit PurchaseNFTEvent(amt);
    }
}
