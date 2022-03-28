const Web3 = require('web3');

const MyContract = require('./src/abis/Kryptobird.json');

var contract;

async function init(){
    const web3 = new Web3("http://localhost:7545");

    const account_address = await web3.eth.getAccounts();

    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];

    contract = new web3.eth.Contract(
        MyContract.abi, 
        deployedNetwork.address
    );

    console.log(deployedNetwork.address);

    // const result = await contract.methods
    //     .totalSupply()
    //     .call();


    // await contract.methods.mint("qwe").send({
    //     from: address[0]
        
    // });

  



    // const addresses = await web3.eth.getAccounts();
    // console.log(addresses[0]);
    // const receipt = await contract.methods.emitEvent('hey').send({
    //     from:addresses[0]
    // });

    // contract.events.MyEvent({})
    //     .on('data',event=>console, )

    // console.log(results);


    // Get Data
    // const result = await contract.methods.getData().call();
    // console.log(result);

    // await contract.methods.sendEther().send({
    //     from : addresses[0],
    //     value:'10000'
    // });

    // console.log(await contract.methods.functionCalled().call());

    // await web3.eth.sendTransaction({
    //     from:addresses[0],
    //     to : contract.options.address,
    //     value : '10000'
    // })
}

async function getName()
{
    const result = await contract.methods
        .name()
        .call();
    console.log(result);
}



init();
