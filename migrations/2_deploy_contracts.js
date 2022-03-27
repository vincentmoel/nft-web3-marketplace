const { default: Web3 } = require("web3");

const KryptoBird = artifacts.require("KryptoBird");

module.exports = async function (deployer,_,accounts) {
  await deployer.deploy(KryptoBird);
  await web3.eth.sendTransaction({
    from: accounts[0],
    to : "0x26232CB4c6B8fb0B156a61855afc840B6b8FCB56",
    value:web3.utils.toWei('1','ether')
  })
};
