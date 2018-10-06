pragma solidity ^0.4.23;

import { UniqueAddressQueue } from './queue.sol';
import { Registrator } from './registrator.sol';


contract EoD {
    Registrator registrator = new Registrator();
    UniqueAddressQueue queue = new UniqueAddressQueue();
    
    function registration_in_platform() public {
        registrator.registr(msg.sender);
    }
    
    function push_in_queue() public {
        queue.push(msg.sender);
    }
}
