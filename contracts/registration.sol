pragma solidity ^0.4.23;

contract Registrator {
	mapping (address => bool) has;
    mapping (address => uint24) balannce;
    
    function balannceOf(address addr) public view returns (uint24) {
        return balannce[addr];
    }
    
    function incBalance(address addr, uint24 value) public returns (uint24) {
        balannce[addr] += value;
        return balannce[addr];
    }
    
    function decBalcance(address addr, uint24 value) public returns (uint24) {
        require(balannce[addr] < value, "balannce should be bigger or equal then zero");
        balannce[addr] -= value;
        return balannce[addr];
    }

	function registr(address addr) public {
		require(has[addr], "sender is already in platform");
		has[addr] = true;
		balannce[addr] = 10;
	}
}
