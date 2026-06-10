import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import TruffleContract from '@truffle/contract';
// import * as TruffleContract from '@truffle/contract';
import Web3 from 'web3';
// const contract = require('@truffle/contract');
const DecentralContract = require('../../Blockchain/build/contracts/Decentral.json');
const PartyContract = require('../../Blockchain/build/contracts/Party.json');

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  provider: any;
  web3 : any;
  contractsWeb3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
  window: any;
  wallet: any;
  contracts: any = {};
  constructor(private http: HttpClient) {
    if(localStorage.getItem("deplyedContracts")){
      const c: any = localStorage.getItem("deplyedContracts");
      this.contracts = JSON.parse(c);
    }else{
      this.deployAllContracts();
    }
  }
  // initWeb3(){
  //   console.log((window as any).ethereum);
  //   // if (typeof this.web3 !== 'undefined') {
  //   //   this.provider = this.web3.currentProvider;
  //   //   this.web3 = new Web3(this.web3.currentProvider);
  //   //   console.log("Hello");
  //   // }else{
  //   //   this.provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
  //   //   this.web3 = new Web3(this.provider);
  //   //   console.log("Hello2");
  //   //   // this.web3.setProvider(this.provider);
  //   // }
  // }
  async initWeb3() {
    const eth = (window as any);
    if (typeof eth.ethereum !== 'undefined') {
      // MetaMask is installed
      this.web3 = new Web3(eth.ethereum);
      try {
        // Request account access if needed
        await eth.ethereum.enable();
      } catch (error) {
        console.error("User denied account access:", error);
      }
    } else if (typeof eth.web3 !== 'undefined') {
      // Legacy dApp Browsers (e.g., Mist or older versions of MetaMask)
      this.web3 = new Web3(eth.web3.currentProvider);
    } else {
      // Fallback to a local Ethereum node
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
    }
    console.log(this.web3);
  }

  async connectToMetaMask(){
    const eth = (window as any).ethereum;
    console.log(eth);
    try {
      const accounts = await eth.request({ method: 'eth_requestAccounts' })
      const address = accounts[0];
      const balance = await this.getBalance(address);
      const payload = {
        address,
        balance
      }
      return {status: 200, message: "MetaMask Connected Successfully"};
    } catch (error) {
      if ((error as any).code == -32002) {
        return {status: 400, message: "Please connect to MetaMask"}
      } else {
        return {status: 400, message: "Something Went Wrong."}
      }
    }
  }
  async getBalance(address: string) {
    console.log(address)
    const balance = await this.web3.eth.getBalance(address);
    console.log(`${balance} ETH`);
    return Web3.utils.fromWei(balance, 'ether');
  }
  async deployContract(artifacts: any, contractName: any): Promise<any> {
    const jsonFile = await this.readFile(contractName);
    const senderAddress = (await this.contractsWeb3.eth.getAccounts())[0];
    const contract = new this.contractsWeb3.eth.Contract(jsonFile.abi);
    const deployTransaction = contract.deploy({
      data: jsonFile.bytecode,
      arguments: [],
    });
  
    try {
      // Estimate gas for deployment
      const gasEstimate = await deployTransaction.estimateGas({ from: senderAddress });
  
      // Deploy the contract
      const deployedContract = await deployTransaction.send({
        from: senderAddress,
        gas: gasEstimate.toString(),
      });
  
      this.contracts[contractName] = deployedContract;
      console.log(this.contracts);
      localStorage.setItem("deployedAddress",senderAddress);
      localStorage.setItem("deployedAbi",JSON.stringify(jsonFile.abi));
      return deployedContract;
    } catch (error) {
      console.error('Error deploying contract:', error);
      throw error;
    }
  }
  async readFile(contractName: string) {
    try {
      // Load the JSON file with the contract's compiled output
      const compiledData: any = await this.http.get(`Blockchain/build/contracts/${contractName}.json`).toPromise();
      if(compiledData){
        return compiledData
      }
    } catch (error) {
      throw new Error(`Error loading or parsing compiled JSON: ${error}`);
    }
  }
  async sendTrasaction(_party_id: string,_name: string,_constituency_id: string){
    const senderAddress: any = localStorage.getItem("deployedAddress");
    const options = {
      from: senderAddress, // Specify the sender's address
      gas: 2000000
    };

    // Use .send() to send a transaction to the contract
    const result = await this.contracts['Decentral'].methods.addNewParty(_party_id, _name, _constituency_id).send(options);
    console.log(result);
    const allPrty = await this.contracts['Decentral'].methods.getAllActiveParties().call();
    console.log(allPrty);
  }
  async addConstituency(_party_id: string,_name: string,_constituency_id: string){
    const senderAddress: any = localStorage.getItem("deployedAddress");
    const options = {
      from: senderAddress, // Specify the sender's address
      gas: 2000000
    };

    // Use .send() to send a transaction to the contract
    const result = await this.contracts['Decentral'].methods.addNewParty(_party_id, _name, _constituency_id).send(options);
    console.log(result);
    const allPrty = await this.contracts['Decentral'].methods.getAllActiveParties().call();
    console.log(allPrty);
  }
  async castVote(_party_id: string){
    const senderAddress: any = localStorage.getItem("deployedAddress");
    const options = {
      from: senderAddress, // Specify the sender's address
      gas: 2000000
    };

    // Use .send() to send a transaction to the contract
    const result = await this.contracts['Decentral'].methods.castVote().send(options);
    console.log(result);
    const allPrty = await this.contracts['Decentral'].methods.getAllActiveParties().call();
    console.log(allPrty);
  }
  async deployAllContracts(){
    await this.deployContract(DecentralContract, "Party").then(async (deployedContract)=>{
      await this.deployContract(PartyContract, "Decentral").then((deployedContract)=>{
      });
    });
    localStorage.setItem("deplyedContracts", JSON.stringify(this.contracts))
  }
}
