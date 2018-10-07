pragma solidity ^0.4.23;


import { Dungeon } from './Dungeon.sol';
import { Point } from './Point.sol';


contract Lobby {

	uint8 NEW = 0;
	uint8 WAITING_FOR_HUMANS_READY = 1;
	uint8 WAITING_FOR_MONSTERS_STEP = 2;
	uint8 WAITING_FOR_HUMANS_STEP = 3;
	uint8 FINISHED = 4;

	uint8 status = NEW;
	uint64 id;
	address[] players;
	uint256 inited_at;
	Dungeon dungeon;
	Point[4] humansPositions;
	Point[4] monstersPositions;

	constructor(uint64 __id, address[] __players) public {
		id = __id;
		players = __players;
		inited_at = block.number;
		dungeon = new Dungeon(inited_at);
	}

	function get_map() public view returns (uint8[480]) {
		return dungeon.get_map();
	}

	function get_player_index(address addr) public view returns (uint8) {
		for (uint8 i = 0; i < players.length; i++) {
			if (addr == players[i]) return i;
		}
		revert("Player not found");
	}

	function get_status() public view returns (uint8[2], uint8[16]) {
		return (
			[uint8(status), get_player_index(msg.sender)],
			[
				uint8(humansPositions[0].x()), humansPositions[0].y(),
				humansPositions[1].x(), humansPositions[1].y(),
				humansPositions[2].x(), humansPositions[2].y(),
				humansPositions[3].x(), humansPositions[3].y(),
				monstersPositions[0].x(), monstersPositions[0].y(),
				monstersPositions[1].x(), monstersPositions[1].y(),
				monstersPositions[2].x(), monstersPositions[2].y(),
				monstersPositions[3].x(), monstersPositions[3].y()
			]
		);
	}

}
