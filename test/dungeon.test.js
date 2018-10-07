const Dungeon = artifacts.require('Dungeon');

let self;

contract('Dungeon', (accounts) => {
	before(async () => {
		self = await Dungeon.deployed();
	});
	describe('get_map()', () => {
		it('qwe', async function () {
			const map = await self.get_map.call();
		});
	});
});
