
module.exports = {
	networks: {
		development: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '*',
		},
	},
	mocha: {
		reporter: 'eth-gas-reporter',
		reporterOptions: {
			currency: 'USD',
			gasPrice: 21,
		},
	},
};
