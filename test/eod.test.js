// noinspection JSUnresolvedVariable
const EoD = artifacts.require('EoD');

let self;

contract('EoD', (accounts) => {
	before(async () => {
		self = await EoD.deployed();
	});
	describe('get_dungeon', () => {
		it('get dungeon, created on deployment', async () => {
			console.log(await self.get_dungeon(0));
		});
	});
});
