pragma solidity ^0.4.23;


contract EchoOfTheDungeon {

	uint8 constant MONSTERS_COUNT = 1;
	uint8 constant HUMANS_COUNT = 1;
	uint8 constant PLAYERS_COUNT = MONSTERS_COUNT + HUMANS_COUNT;
	uint8 constant CHESTS_COUNT = 5;
	uint8 constant GOAL = 3;
	uint8 constant MAP_WIDTH = 11;
	uint8 constant MAP_HEIGHT = 11;
	uint16 constant CELLS_COUNT = MAP_WIDTH * MAP_HEIGHT;
	uint256 constant UINT256_MAX = ~uint256(0);
	int8[8] /* constant */ D8;
	int8[12] /* constant */ D12;

	struct Dungeon {
		mapping(uint16 => bool) is_room;
		uint16[] rooms_positions;
		uint16[MONSTERS_COUNT] monsters_start_positions;
		uint16[CHESTS_COUNT] chests_positions;
	}

	struct Game {
		mapping(address => bool) is_in_game;
		uint16 dungeon_id;
		address[PLAYERS_COUNT] players;
		uint16[MONSTERS_COUNT] monsters_positions;
		uint16[HUMANS_COUNT] humans_positions;
	}

	mapping(uint16 => Dungeon) dungeons;
	uint16 dungeons_count = 0;
	uint16 next_dungeon_id = 0;
	mapping(uint24 => Game) games;
	uint24 next_game_id = 0;
	address admin;
	uint8 players_counter = 0;

	constructor(
		uint16[] rooms_positions,
		uint16[MONSTERS_COUNT] monsters_positions,
		uint16[CHESTS_COUNT] chests_positions
	) public {
		admin = msg.sender;
		uint16 MAP_WIDTH_2 = 2 * MAP_WIDTH;
		D8 = [
			int8(1),
			int8(-MAP_WIDTH + 1),
			int8(-MAP_WIDTH),
			int8(-MAP_WIDTH - 1),
			int8(-1),
			int8(MAP_WIDTH - 1),
			int8(MAP_WIDTH),
			int8(MAP_WIDTH + 1)
		];
		D12 = [
			int8(2),
			int8(-MAP_WIDTH + 2),
			int8(-MAP_WIDTH_2 + 1),
			int8(-MAP_WIDTH_2),
			int8(-MAP_WIDTH_2 - 1),
			int8(-MAP_WIDTH - 2),
			int8(-2),
			int8(MAP_WIDTH - 2),
			int8(MAP_WIDTH_2 - 1),
			int8(MAP_WIDTH_2),
			int8(MAP_WIDTH_2 + 1),
			int8(MAP_WIDTH + 2)
		];
		add_dungeon(rooms_positions, monsters_positions, chests_positions);
	}

	function find_game() public returns (uint24) {
		Game storage game = games[next_game_id];
		require(!game.is_in_game[msg.sender], "already in queue");
		game.is_in_game[msg.sender] = true;
		game.players[players_counter] = msg.sender;
		players_counter++;
		uint24 result = next_game_id;
		if (players_counter == PLAYERS_COUNT) {
			players_counter = 0;
			game.dungeon_id = next_dungeon_id;
			Dungeon memory dungeon = dungeons[next_dungeon_id];
			for (uint8 i = 0; i < MONSTERS_COUNT; i++) {
				game.monsters_positions[i] = dungeon.monsters_start_positions[i];
			}
			next_dungeon_id++;
			if (next_dungeon_id == dungeons_count) next_dungeon_id = 0;
			next_game_id++;
		}
		return result;
	}

	function get_game_state(uint24 game_id) public view returns (
		uint16 dungeon_id,
		uint16[MONSTERS_COUNT] monsters_positions,
		uint16[HUMANS_COUNT] humans_positions
	) {
		Game memory game = games[game_id];
		dungeon_id = game.dungeon_id;
		monsters_positions = game.monsters_positions;
		humans_positions = game.humans_positions;
	}

	function get_dungeon(uint16 dungeon_id) public view returns (uint16[] rooms_positions) {
		return dungeons[dungeon_id].rooms_positions;
	}

	function add_dungeon(
		uint16[] rooms_positions,
		uint16[MONSTERS_COUNT] monsters_positions,
		uint16[CHESTS_COUNT] chests_positions
	) public {
		require(msg.sender == admin, "only admin can add dungeons");
		Dungeon storage dungeon = dungeons[dungeons_count];
		dungeons_count++;
		uint8 i;
		for (i = 0; i < rooms_positions.length; i++) {
			dungeon.is_room[rooms_positions[i]] = true;
			dungeon.rooms_positions.push(rooms_positions[i]);
		}
		for (i = 0; i < MONSTERS_COUNT; i++) {
			dungeon.monsters_start_positions[i] = monsters_positions[i];
		}
		for (i = 0; i < CHESTS_COUNT; i++) {
			dungeon.chests_positions[i] = chests_positions[i];
		}
	}

}
