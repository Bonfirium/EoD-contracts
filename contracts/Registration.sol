pragma solidity ^0.4.23;


contract Registrator {

	mapping (address => bool) has;
	mapping (address => uint24) balance;
	
	function balanceOf(address addr) public view returns (uint24) {
		return balance[addr];
	}
	
	function incBalance(address addr, uint24 value) public returns (uint24) {
		balance[addr] += value;
		return balance[addr];
	}
	
	function decBalcance(address addr, uint24 value) public returns (uint24) {
		require(balance[addr] < value, "balance should be bigger or equal then zero");
		balance[addr] -= value;
		return balance[addr];
	}

	function registrate(address addr) public {
		require(has[addr], "sender is already in platform");
		has[addr] = true;
		balance[addr] = 10;
	}
}
