const Dungeon = artifacts.require('./Dungeon.sol');

module.exports = async function (deployer) {
	await deployer.deploy(Dungeon, 0);
};
