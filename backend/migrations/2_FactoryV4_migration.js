const WalletFactory = artifacts.require("WalletFactoryV4");

module.exports = function (deployer) {
  deployer.deploy(WalletFactory);
};
