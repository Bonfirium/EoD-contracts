pragma solidity ^0.4.23;


contract Point {

	uint8 _x;
	uint8 _y;

	constructor(uint8 x, uint8 y) public {
		set(x, y);
	}

	function set(uint8 x, uint8 y) public {
		_x = x;
		_y = y;
	}

	function x() public view returns (uint8) {
		return _x;
	}

	function y() public view returns (uint8) {
		return _y;
	}

}
