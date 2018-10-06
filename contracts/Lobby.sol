pragma solidity ^0.4.23;


import { Dungeon } from './Dungeon.sol';


contract Lobby {

	uint64 id;
	address[] players;
	uint256 inited_at;
	Dungeon dungeon;

	constructor(uint64 __id, address[] __players) {
		id = __id;
		players = __players;
		inited_at = block.number;
		dungeon = new Dungeon(inited_at);
	}

	function get_map() public view returns (uint8[16][30]) {
		return dungeon.get_map();
	}

}
