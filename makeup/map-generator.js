const WIDTH = 30;
const HEIGHT = 16;
const EMPTY = 0;
const POTENTIAL_ROOM = 1;
const ROOM = 2;
const WALL = 3;
const PORTAL = 4;
const TREASURE = 5;

const D8_X = [1, 1, 0, -1, -1, -1, 0, 1];
const D8_Y = [0, -1, -1, -1, 0, 1, 1, 1];
const D8 = D8_X.map((dx, index) => ({ dx, dy: D8_Y[index] }));
const D12_X = [2, 2, 1, 0, -1, -2, -2, -2, -1, 0, 1, 2];
const D12_Y = [0, -1, -2, -2, -2, -1, 0, 1, 2, 2, 2, 1];
const D12 = D12_X.map((dx, index) => ({ dx, dy: D12_Y[index] }));

const inRange = (x, y) => x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT;
const comprehension = (count, map) =>
	new Array(count).fill(0).map((_, index) => map(index));
const rand = (x) => Math.floor(Math.random() * x);

const map = comprehension(WIDTH, () => comprehension(HEIGHT, () => EMPTY));
const xStart = rand(WIDTH);
const yStart = rand(HEIGHT);
map[xStart][yStart] = POTENTIAL_ROOM;
const pool = [{ x: xStart, y: yStart }];

while (pool.length) {
	const ind = rand(pool.length);
	const { x, y } = pool[ind];
	pool[ind] = pool[pool.length - 1];
	pool.pop();
	if (map[x][y] !== 1) continue;
	map[x][y] = ROOM;
	D8.forEach(({ dx, dy }) => {
		const x1 = x + dx;
		const y1 = y + dy;
		if (!inRange(x1, y1)) return;
		map[x1][y1] = WALL;
	});
	D12.forEach(({ dx, dy }) => {
		const x1 = x + dx;
		const y1 = y + dy;
		if (!inRange(x1, y1) || map[x1][y1] !== EMPTY) return;
		map[x1][y1] = POTENTIAL_ROOM;
		pool.push({ x: x1, y: y1 });
	})
}

const deadends = [];

for (let x = 0; x < WIDTH; x++) {
	for (let y = 0; y < HEIGHT; y++) {
		if (map[x][y] !== ROOM) continue;
		let doorsCountGT1 = false;
		let isDeadend = true;
		for (let i = 0; i < 12; i++) {
			const x1 = x + D12_X[i];
			const y1 = y + D12_Y[i];
			if (!inRange(x1, y1) || ![ROOM, PORTAL].includes(map[x1][y1])) continue;
			if (doorsCountGT1) {
				isDeadend = false;
				break;
			}
			doorsCountGT1 = true;
		};
		if (!isDeadend || !doorsCountGT1) continue;
		deadends.push({ x, y });
		map[x][y] = PORTAL;
	}
}

const stepsToPortal = comprehension(WIDTH, () => comprehension(HEIGHT, () => -1));
let prevQ = [];
let q = [];
let nextQ = [];
let stepIndex = 1;
let mainPortalPos = null;
deadends.forEach(({ x, y }) => {
	stepsToPortal[x][y] = 0;
	q.push({ x, y });
});
while (true) {
	if (q.length === 0) {
		if (nextQ.length === 0) {
			mainPortalPos = prevQ[rand(prevQ.length)];
			break;
		}
		stepIndex++;
		q = nextQ;
		nextQ = [];
		prevQ = [];
	}
	const { x, y } = q.pop();
	prevQ.push({ x, y });
	D12.forEach(({ dx, dy }) => {
		const x1 = x + dx;
		const y1 = y + dy;
		if (!inRange(x1, y1) || map[x1][y1] !== ROOM) return;
		const cell = stepsToPortal[x1][y1];
		if (cell !== -1 && cell < stepIndex) return;
		nextQ.push({ x: x1, y: y1 });
		stepsToPortal[x1][y1] = stepIndex;
	});
}

map[mainPortalPos.x][mainPortalPos.y] = PORTAL;

const rooms = [];
for (let x = 0; x < WIDTH; x++) {
	for (let y = 0; y < HEIGHT; y++) {
		if (map[x][y] === ROOM) rooms.push({ x, y });
	}
}

for (let i = 0; i < 11; i++) {
	const randIndex = rand(rooms.length);
	const { x, y } = rooms[randIndex];
	rooms[randIndex] = rooms[rooms.length - 1];
	rooms.pop();
	map[x][y] = TREASURE;
}

for (let y = 0; y < HEIGHT; y++) {
	let str = '';
	for (let x = 0; x < WIDTH; x++) {
		str += ({
			[ROOM]: 8888,
			[PORTAL]: '||||',
			[TREASURE]: '====',
		})[map[x][y]] || '    ';
	}
	console.log(str);
	console.log(str);
}
