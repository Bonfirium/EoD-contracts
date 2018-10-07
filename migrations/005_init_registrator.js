const Registrator = artifacts.require('./Registrator.sol');

module.exports = async function (deployer) {
	await deployer.deploy(Registrator, 0);
};
