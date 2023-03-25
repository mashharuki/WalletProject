const MyToken = artifacts.require("MyToken");

module.exports = async function (deployer) {
  // deploy
  deployer.deploy(MyToken, "MyToken", "MTN", {
    from : "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072"
  });
  // get instance
  //let instance = await MyToken.deployed();
  // transfer ownership to kms address
  //await instance.transferOwnership("0xeDf54d22e96B3053722308951799162508973486", {
  //  from: "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072"
  //});
};
