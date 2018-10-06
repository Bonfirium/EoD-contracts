const UniqueAddressQueue = artifacts.require('./UniqueAddressQueue.sol');

module.exports = function(deployer) {
	deployer.deploy(UniqueAddressQueue);
};
