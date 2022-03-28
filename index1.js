const Web3 = require('web3');
const MyContract = require('./src/abis/Kryptobird.json');

const HDWalletProvider = require('@truffle/hdwallet-provider');

// address 1
// const address = "0x261aae784e2b9183f28378410f8532cf5b2f0a60";
// const privateKey = "0d15687a437d866d596e0a2df8ba433cfa788d622a05f0179772efa16958c5b6";
// https://ropsten.etherscan.io/address/0x261aae784e2b9183f28378410f8532cf5b2f0a60
// https://ropsten.etherscan.io/tx/0x40c709d16a983b7e5ae042a6c489d2a4d65a04db5cbeea143b2bd45f06047458

//address 2 (terbaru)
const address = "0x26232CB4c6B8fb0B156a61855afc840B6b8FCB56";
const privateKey = "e9ed5d675d45c89d3c7fb5cd23acc0ff1d9adcd380a6bbf4ad0b4e634ac71ca8";
// https://ropsten.etherscan.io/tx/0xec1723e56c2f1ac1680516d9234b5bb3f3d8feed2357d1430090399c02f2a3b1

const init = async() => {
    try{
        const provider = new HDWalletProvider(
            privateKey,
            'https://ropsten.infura.io/v3/69c8d5587a594835b3141a01cc2b23fa',
        );
        const web3 = new Web3(provider);
    
        //const id = await web3.eth.net.getId();
        //const deployedNetwork = MyContract.networks[id];
        let contract = new web3.eth.Contract(
            MyContract.abi, 
            //deployedNetwork.address
        );
        
        contract = await contract
            .deploy({data:MyContract.bytecode})
            .send({from:address})
    
        const result = await contract.methods
            .symbol()
            .call();
    
        console.log(result);
    }catch(err)
    {
        console.log(err);
    }
    

}

init();