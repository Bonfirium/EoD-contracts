const generateDungeon = require('../makeup/map-generator');

// noinspection JSUnresolvedVariable
const EoD = artifacts.require('./EoD.sol');
const WIDTH = 11;
const HEIGHT = 11;

function convertCoord({ x, y }) {
	return x + y * WIDTH;
}

function convertCoords(coords) {
	return coords.map(convertCoord);
}

module.exports = async function (deployer) {
	const {
		roomsPositions,
		chestsPositions,
		monstersPositions,
	} = generateDungeon({ width: WIDTH, height: HEIGHT, monstersCount: 1, chestsCount: 5 });
	await deployer.deploy(
		EoD,
		convertCoords(roomsPositions),
		convertCoords(monstersPositions),
		convertCoords(chestsPositions),
	);
};
