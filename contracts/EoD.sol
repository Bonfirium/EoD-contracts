pragma solidity ^0.4.23;


import { UsersPool } from './UsersPool.sol';
import { Registrator } from './Registration.sol';


contract EoD {

    Registrator registrator = new Registrator();
    UsersPool pool = new UsersPool();
    
    function registrate() public {
        registrator.registrate(msg.sender);
    }
    
    function find_game() public {
        pool.push(msg.sender);
    }

}
