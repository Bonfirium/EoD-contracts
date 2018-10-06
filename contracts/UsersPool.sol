pragma solidity ^0.4.23;


contract UsersPool {

    uint64 next_game_id = 1;
    address [] data;
	mapping (address => uint64) last_game_id;

    function get_next_game_id() public view returns (uint64) {
		return next_game_id;
	}

	function is_empty() public view returns (bool) {
		return data.length == 0;
	}

	function get_size() public view returns (uint) {
		return data.length;
	}

	function is_full() public view returns (bool) {
		return data.length == 8;
	}

	function is_in_pool(address addr) public view returns (bool) {
		return last_game_id[addr] == next_game_id;
	}

	function push(address addr) public returns () {
		require(last_game_id[addr] == next_game_id, "sender is already in pool");
		last_game_id[addr] = next_game_id;
		data.push(addr);
	}

	function clear() public returns (address[]) {
		address[] result = data;
		next_game_id += 1;
		delete data;
		return result;
	}

	function get_next_game_id() public view returns (uint64) {
		return next_game_id;
	}

}
