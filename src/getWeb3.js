import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        console.log("window.ethereum detected...");
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed - but we are read only so no need
          // await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
          console.log("web3 resolved using version", web3.version);
        } catch (error) {
          reject(error);
        }
      }
      // If no metamastk then default to rinkeby now, main net later
      else {
        console.log("No injected web3 detected, using integrated web3 connected to Rinkeby test network...");
        const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io");
        const web3 = new Web3(provider);
        window.web3 = web3;
        resolve(web3);
      }
    });
  });

export default getWeb3;
