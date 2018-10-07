const { strictEqual: eq, ok, rejects } = require('assert');
const comprehension = require('../utils/comprehension');
const getRandomAddress = require('../utils/getRandomAddress');

const UsersPool = artifacts.require('UsersPool');

let self;

contract('UsersPool', (accounts) => {
	before(async () => {
		self = await UsersPool.deployed();
	});
	describe('qwe', () => {
		it('asd', () => {
			
		})
	});
});
