const EoD = artifacts.require('./EoD.sol');

module.exports = function(deployer) {
	deployer.deploy(EoD);
};
