const UsersPool = artifacts.require('./UsersPool.sol');

module.exports = function(deployer) {
	deployer.deploy(UsersPool);
};
