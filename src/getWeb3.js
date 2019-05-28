import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        console.log("window.ethereum detected...");
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        console.log("window.web3 legacy detected...");
        const web3 = window.web3;
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        console.log("No injected web3 detected, using integrated web3 connected to Rinkeby test network...");
        const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io");
        const web3 = new Web3(provider);
        resolve(web3);
      }
    });
  });

export default getWeb3;
