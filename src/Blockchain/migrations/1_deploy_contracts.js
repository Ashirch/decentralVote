const Party = artifacts.require("./Party.sol");
const Decentral = artifacts.require("./Decentral.sol");
module.exports = function(deployer) {
  deployer.deploy(Decentral);
  deployer.deploy(Party);
};
