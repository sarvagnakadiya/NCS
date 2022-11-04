import './App.css';
import { ethers } from "ethers";
import React, { useState } from "react";
import ncs from './artifacts/contracts/ncs.sol/ncs.json';
import cometInterface from './comet artifacts/contracts/CometInterface.sol/CometInterface.json';


function App() {
  const CONTRACT_ADDRESS = "0x0B306BF915C4d645ff596e518fAf3F9669b97016";    //Localhost
  // const CONTRACT_ADDRESS = "0x98eb92FD2cA6335BdFec265E985402Ae54163857"; //polygon
  // const CONTRACT_ADDRESS = "0x42A8061a664d1087820417c85cF60ccbB6B3C914"; //Goerli

  // const COMET_ADDRESS = "0x1C1853Bc7C6bFf0D276Da53972C0b1a066DB1AE7";       //mainnet
  const COMET_ADDRESS = "0x1c6d7f15935D275a1521D3457dF3b9B7ee89d6Ca";       //Goerli

  const [userAddress, setUserAddress] = useState("");
  const [planId, setPlanId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [planName, setPlanName] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planTimePeriod, setPlanTimePeriod] = useState("");



  // onChange={event => setUserId(event.target.value)}
  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const addr = await signer.getAddress();
    setUserAddress(addr.toString());
    const connectedContract = new ethers.Contract(
      COMET_ADDRESS,
      cometInterface.abi,
      signer
    );

  }



  const getPrice = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      // const addr = await signer.getAddress();
      // setUserAddress(addr.toString());

      const connectedContract = new ethers.Contract(
        COMET_ADDRESS,
        cometInterface.abi,
        signer
      );
      console.log("wait...")
      // const utilization = await connectedContract.callStatic.getSupplyRate(0.8 * 10 ^ 18);
      // const utilization = await connectedContract.callStatic.getUtilization();
      const utilization = await connectedContract.supply("0x56Fe5584b352310f90FCb81D893135327c0d74E2", 100, { gasLimit: 3000000 });
      console.log(utilization);
    }
  }
  const addUser = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());

      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait...")
      let tx = await connectedContract.addUser(name, email, number);
      console.log('=V=====V=======V=========V=======V=====V=');
      console.log(tx);
      console.log("value set!")
      console.log('====================================');
    }
  }



  const getUserDetails = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait...")
      let tx = await connectedContract.getUserDetails(userAddress);

      console.log('=V======V========V======V=======V=======V=');
      console.log(tx[0]);
      console.log(tx[1]);
      console.log(parseInt(tx[2]));
      console.log("Data Fetched!");
      console.log('====================================');

    }
  }


  const deleteUser = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait...")
      let tx = await connectedContract.deleteUser();

      console.log('=V======V========V======V=======V=======V=');
      console.log(tx);
      console.log("user Deleted!")
      console.log('====================================');
    }
  }

  const addPlan = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());

      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait...")
      let tx = await connectedContract.addPlan(planName, planPrice, planTimePeriod);
      console.log('=V======V========V======V=======V=======V=');
      console.log(tx);
      console.log("Plan added!")
      console.log('====================================');

    }
  }
  const getPlanDetails = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());

      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait...")
      let tx = await connectedContract.getPlanDetails(planId);

      console.log('=V======V========V======V=======V=======V=');
      console.log(tx[0]);
      console.log(parseInt(tx[1]));
      console.log(parseInt(tx[2]));
      console.log('====================================');


    }
  }
  const deletePlan = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());

      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait...")
      let tx = await connectedContract.deletePlan(1);
      console.log('=V======V========V======V=======V=======V=');
      console.log(tx);
      console.log("Plan Deleted!")
      console.log('====================================');

    }
  }
  const subscribe = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());

      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait...")
      let tx = await connectedContract.subscribe(userAddress, planId);
      console.log('=V======V========V======V=======V=======V=');
      console.log(tx);
      console.log("Subscribed!")
      console.log('====================================');

    }
  }
  const deActivate = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());

      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait...")
      let tx = await connectedContract.deActivate(userAddress, planId);
      console.log('=V======V========V======V=======V=======V=');
      console.log(tx);
      console.log("Deactivated!")
      console.log('====================================');

    }
  }
  const showUserPlans = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());

      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait...")
      let tx = await connectedContract.showUserPlans(userAddress);
      console.log(tx)
      const userPlans = [];
      console.log('=V======V========V======V=======V=======V=');
      for (let i = 0; i < tx.length; i++) {
        userPlans.push(parseInt(tx[i]));
      }
      console.log(userPlans)
      console.log("here are all plans user've subscribed to!")
      console.log('====================================');
      return userPlans;

    }
  }
  const showUserActivePlans = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());

      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ncs.abi,
        signer
      );
      console.log("wait calling another fn...")
      const userPlans = await showUserPlans();
      console.log(userPlans)
      console.log(userPlans.length)

      console.log("wait...")
      let tx;
      const activePlans = [];
      for (let i = 0; i < userPlans.length; i++) {
        tx = await connectedContract.showUserActivePlans(userAddress, userPlans[i]);
        activePlans.push(tx);
      }
      console.log('=V======V========V======V=======V=======V=');
      console.log(activePlans)
      console.log("Your active Plans!")
      console.log('====================================');

    }
  }
  return (
    <div className="App">
      {/* <button onClick={connectWallet}>CONNECT</button> */}
      <button onClick={getPrice}>get Price</button>
      <input type='text' placeholder='Enter Name' onChange={(e) => { setName(e.target.value) }}></input>
      <input type='text' placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value) }}></input>
      <input type='number' placeholder='Enter Number' onChange={(e) => { setNumber(e.target.value) }}></input>
      <button onClick={addUser}>addUser</button>
      <button onClick={getUserDetails}>get User Details</button>
      <button onClick={deleteUser}>delete User</button>

      <br></br>
      <input type='text' placeholder='Enter Plan name' onChange={(e) => { setPlanName(e.target.value) }}></input>
      <input type='text' placeholder='Enter plan price' onChange={(e) => { setPlanPrice(e.target.value) }}></input>
      <input type='number' placeholder='Enter plan time period' onChange={(e) => { setPlanTimePeriod(e.target.value) }}></input>
      <button onClick={addPlan}>Add Plan</button>
      <br></br>
      <input type='number' placeholder='Enter PlanId' onChange={(e) => { setPlanId(e.target.value) }}></input>
      <button onClick={getPlanDetails}>Get plan Details</button>
      <button onClick={subscribe}>SUBSCRIBE</button>
      <button onClick={deActivate}>DEACTIVATE</button>
      <button onClick={deletePlan}>delete plan</button>
      <button onClick={showUserPlans}>show user plans</button>
      <button onClick={showUserActivePlans}>show user active plans</button>





    </div>
  );
}

export default App;
