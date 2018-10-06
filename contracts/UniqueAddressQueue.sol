pragma solidity ^0.4.23;


contract UniqueAddressQueue {
    uint64 gameId = 1;
    address [] data;
	mapping (address => uint64) lastGameId;

    function game_id() public view returns (uint64) {
		return gameId;
	}

	function is_empty() public view returns (bool) {
		return data.length == 0;
	}

	function get_size() public view returns (uint) {
		return data.length;
	}

	function is_in_queue(address addr) public view returns (bool) {
		return lastGameId[addr] == gameId;
	}

	function push(address addr) public returns (uint64) {
		require(lastGameId[addr] == gameId, "sender is already in queue");
		lastGameId[addr] = gameId;
		data.push(addr);
		if(data.length == 7) {
			// create game
		    delete data;
		    gameId += 1;
		}
		return gameId;
	}

}
