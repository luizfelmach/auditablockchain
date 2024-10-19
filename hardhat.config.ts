import { HardhatUserConfig, task } from "hardhat/config";
import { Auditability } from "./typechain-types/Auditability";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(account.address);
    console.log(account.address, hre.ethers.formatEther(balance), "ETH");
  }
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArgs.account);
    console.log(hre.ethers.formatEther(balance), "ETH");
  });

task("store", "Store Merkle Root on blockchain")
  .addPositionalParam("index", "Index to map")
  .addPositionalParam("root", "Merkle Root to store")
  .addParam("smart", "The smart contract's address")
  .setAction(async (taskArgs, hre) => {
    const { index, root, smart } = taskArgs;
    const Auditability = await hre.ethers.getContractFactory("Auditability");
    const auditability = Auditability.attach(smart) as Auditability;
    await auditability
      .store(index, root)
      .catch((err) => console.log(err.message));
  });

task("proof", "Proof off-chain Merkle Root")
  .addPositionalParam("index", "Index to map")
  .addPositionalParam("root", "Merkle Root to proof")
  .addParam("smart", "The smart contract's address")
  .setAction(async (taskArgs, hre) => {
    const { index, root, smart } = taskArgs;
    const Auditability = await hre.ethers.getContractFactory("Auditability");
    const auditability = Auditability.attach(smart) as Auditability;

    await auditability
      .proof(index, root)
      .then(console.log)
      .catch((err) => console.log(err.message));
  });

export default config;
