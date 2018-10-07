const { fail } = require('assert');

const comprihansion = (size, map) => new Array(size).fill(0).map((_, index) => map(index));
const getRandomAddress = require('../utils/getRandomAddress');

const Registrator = artifacts.require('Registrator');

let self;

contract('Registrator', (accounts) => {
	before(async () => {
		self = await Registrator.deployed();
	});
	describe('is_registred(address addr)', async () => {
		it('false', async () => {
			await self.is_registred.call({ from: accounts[0] }).then((res) => eq(res, false));
		});
		it('true', async () => {
			await self.registrate({ from: accounts[0] });
			await self.is_registred.call({ from: accounts[0] }).then((res) => eq(res, true));
		});
	});
	describe('inc_balance(address addr, uint24 value)', async () => {
		it('successful', async () => {
			const addBalence = 2
			await self.inc_balance.call(accounts, addBalence).then((res) => ok(res.eq(10 + addBalence)));
		});
	});
	describe('dec_balance(address addr, uint24 value)', async () => {
		it('successful', async () => {
			const decBalance = 7
			const newBalance = self.dec_balance.call(accounts, decBalance).then((res) => ok(res.eq(10 - decBalance)));
			await self.dec_balance.call(accounts, decBalance).then((res) => ok(res.eq(10 - decBalance)));
		});
		it('exception', async () => {
			try {
				await self.dec_balance(accounts, 25);			
			} catch(e) {
				return
			}
			fail('Exception expected')
		});
	});
	describe('registrate(address addr)', async () => {
		it('successful registrate', async () => {
			await self.registrate({ from: accounts[0] });
			await self.balance_of.call({ from: accounts[0] }).then((res) => ok(res.eq(10)));
		});
	});
});
