const { strictEqual: eq, ok, rejects } = require('assert');

const UniqueAddressQueue = artifacts.require('UniqueAddressQueue');

const comprihansion = (size, map) => new Array(size).fill(0).map((_, index) => map(index));
const getRandomAddress = () =>
	`0x${comprihansion(40, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

let self;

contract('UniqueAddressQueue', (accounts) => {
	before(async () => {
		self = await UniqueAddressQueue.deployed();
	});
	describe('is_empty()', () => {
		it('is empty on deploy', () => self.is_empty.call().then((res) => eq(res, true)));
		it('is not empty with pushed elements', async () => {
			await self.push(getRandomAddress());
			eq(await self.is_empty.call(), false);
		});
		it('become empty on pop all elements', async () => {
			await self.push(getRandomAddress());
			eq(await self.is_empty.call(), false);
			await self.pop();
			eq(await self.is_empty.call(), false);
			await self.pop();
			eq(await self.is_empty.call(), true);
		});
	});
	describe('get_size()', () => {
		it('zero on empty', () => self.get_size.call().then((res) => ok(res.eq(0))));
		// should be greater than or equals to 2
		const count = 5;
		it('eq to push() count', async () => {
			await Promise.all(comprihansion(count, () => self.push(getRandomAddress())));
			await self.get_size.call().then((res) => ok(res.eq(count)));
		});
		it('reduced on pop()', async () => {
			await self.pop();
			await self.get_size.call().then((res) => ok(res.eq(count - 1)));
		});
		it('eq to zero on pop() all elements', async () => {
			await Promise.all(comprihansion(count - 1, () => self.pop()));
			await self.get_size.call().then((res) => ok(res.eq(0)));
		});
	});
	describe('is_in_queue(address)', () => {
		it('false', () => self.is_in_queue.call(getRandomAddress()).then((res) => eq(res, false)));
		it('true', async () => {
			const address = getRandomAddress();
			await self.push(address);
			eq(await self.is_in_queue.call(address), true);
		});
		after(() => self.pop());
	});
	describe('push(address)', () => {
		it('returns 1 on first push', () => self.push.call(getRandomAddress()).then((res) => ok(res.eq(1))));
		it('returns 2 on second push', async () => {
			await self.push(getRandomAddress());
			await self.push.call(getRandomAddress()).then((res) => ok(res.eq(2)));
		});
		it('raise on second push of same address', async () => {
			const address = getRandomAddress();
			await self.push(address);
			await rejects(() => self.push.call(address));
		});
		after(() => Promise.all(comprihansion(2, () => self.pop())));
	});
	describe('pop()', () => {
		it('raise on empty', () => rejects(() => self.pop.call()));
		it('returns address of first unpoped push(address) call', async () => {
			
		})
	});
});
