//Main unit test that creates deploys contract onto hardhat unit test. (Will also work with testnet, or mainnet)

import { use } from 'chai';
import { ethers } from 'hardhat';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

before(async function () {

  let [owner] = await ethers.getSigners();
  const nft = await ethers.getContractFactory("ContractName");

  global.nftDeployed = await nft.deploy();

  const signers: Contract[] = [];
  
  //loop here number of wallets you want to mint
  for (let i = 0; i < 1000; i++) {
    let wallet = ethers.Wallet.createRandom();
    let walletConnected = wallet.connect(ethers.provider);
    //Give wallet 0.5 eth so it can do all the things it needs.
    await owner.sendTransaction({ to: wallet.address, value: ethers.utils.parseEther("0.5") });
    const newConnection = await global.nftDeployed.connect(walletConnected);
    signers.push(newConnection);
  }
  //set global vars so other unit test files can find information. Mocha might have a better way to do this? Not sure this works.
  global.signers = signers;
  global.stakeSigners = stakeSigners;

});
