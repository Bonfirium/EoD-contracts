const { fail } = require('assert');

const comprihansion = (size, map) => new Array(size).fill(0).map((_, index) => map(index));
const getRandomAddress = require('../utils/getRandomAddress');

const EoD = artifacts.require('EoD');

let self;

contract('EoD', (accounts) => {
	before(async () => {
		self = await EoD.deployed();
	});
	describe('registrate()', () => {
		it('successful on empty', async () => {
			await self.registrate.call({ from: getRandomAddress() });
		});
		it('registrate', () => async () =>{
			await self.registrate()
			await self.balance.call().then((res) => ok(res.eq(10)))
		});
		it('does not register twice', () => {
			const addr = getRandomAddress();
			await self.registrate({ from: addr });
			try {
				await self.registrate.call({ from: addr });
			} catch (e) {
				return
			}
			fail('Exception expected')
		});
	});
	describe('find_game()', () => {
		//1 баланс нулевой у игрока
		it('empty balance', async () => {
			const addr = getRandomAddress();
			const value = 10
			await self.registrate( {from: addr} );
			try {
				await self.inc_balance(addr, value)
			} catch(e) {
				return
			}
			fail('Exception expected')
		});
		//2 пул переполнен
		it('pool assembled', async () => {
			const addrs = comprihansion(8, () => getRandomAddress());
			await Promise.all(addrs.map((addr) => self.find_game({ from: addr })));
			const game_id = self.get_game_id()
			await self.find_game.call({ from: addrs[0] }).then((res) => ok(res.eq(game_id)));
		});	
		it('get_map(lobby_id)', () => {});	
	});
	describe('is_registred()', async () => {
		it('false', async () => {
			const addr =  getRandomAddress()
			await self.registrate({ from: addr });
			await self.is_registred().call({from: getRandomAddress()}).then((res) => eq(res, false));
		});
		it('true', async () => {
			const addr =  getRandomAddress()
			await self.registrate({ from: addr });
			await self.is_registred().call({from: addr}).then((res) => eq(res, true));
		});
	});
});

