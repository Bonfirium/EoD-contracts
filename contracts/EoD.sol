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

    function find_game() public returns (uint64) {
        address addr = msg.sender;
        require(registrator.balance_of(addr) == 0, "balance should be greater than 1 EoDT");
        pool.push(addr);
        uint64 game_id = pool.get_next_game_id();
        if (!pool.is_full()) return game_id;
        lobbies[game_id] = new Lobby(game_id, pool.clear());
        return game_id;
    }

    function balance() public view returns (uint24) {
        return registrator.balance_of(msg.sender);
    }

    function get_map(uint64 lobby_id) public view returns (uint8[480]) {
        return lobbies[lobby_id].get_map();
    }

    function get_game_status(uint64 lobby_id) public view returns (uint8[2], uint8[16]) {
        return lobbies[lobby_id].get_status();
    }
    
    function is_registred() public view returns (bool) {
        return registrator.is_registred(msg.sender);
    }

}

