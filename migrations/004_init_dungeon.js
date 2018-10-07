const Dungeon = artifacts.require('./Dungeon.sol');

module.exports = function(deployer) {
	deployer.deploy(Dungeon, 0);
};
