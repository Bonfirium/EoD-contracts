pragma solidity ^0.4.23;


contract UniqueAddressQueue {

	mapping (address => bool) has;
	mapping (uint64 => address) data;
	uint64 front = 0;
	uint64 back = 0;

	function is_empty() public view returns (bool) {
		return back == front;
	}

	function get_size() public view returns (uint64) {
		return back - front;
	}

	function is_in_queue(address addr) public view returns (bool) {
		return has[addr];
	}

	function push(address addr) public returns (uint64) {
		require(!has[addr], "sender is already in queue");
		has[addr] = true;
		data[back] = addr;
		back += 1;
		return get_size();
	}

	function pop() public returns (address) {
		require(!is_empty(), "queue is empty");
		address result = data[front];
		front += 1;
		delete has[result];
		delete data[front];
		return result;
	}

}
