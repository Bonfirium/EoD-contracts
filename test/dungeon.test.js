const Dungeon = artifacts.require('Dungeon');

let self;

contract('Dungeon', (accounts) => {
	before(async () => {
		self = await Dungeon.deployed();
	});
	describe('get_map()', async () => {
		console.log(await self.get_map.call());
	});
});
