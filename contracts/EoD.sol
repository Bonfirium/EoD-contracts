pragma solidity ^0.4.23;


import { Lobby } from './Lobby.sol';
import { Registrator } from './Registrator.sol';
import { UsersPool } from './UsersPool.sol';


contract EoD {

    Registrator registrator = new Registrator();
    UsersPool pool = new UsersPool();
    mapping (uint64 => Lobby) lobbies;

    function registrate() public {
        registrator.registrate(msg.sender);
    }

    function find_game() public {
        address addr = msg.sender;
        require(registrator.balance_of(addr) == 0, "balance should be greater than 1 EoDT");
        pool.push(addr);
        if (!pool.is_full()) return;
        uint64 game_id = pool.get_next_game_id();
        address[] players = pool.clear();
        lobbies[game_id] = new Lobby(game_id, players);
    }

    function get_map(uint64 lobby_id) public view returns (uint8[16][30]) {
        return lobbies[lobby_id].get_map();
    }

}
