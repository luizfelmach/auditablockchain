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

task("store", "Store hash on node")
  .addPositionalParam("id", "Id to map")
  .addPositionalParam("hash", "Hash to store")
  .addParam("smart", "The smart contract's address")
  .setAction(async (taskArgs, hre) => {
    const { id, hash, smart } = taskArgs;
    const Auditability = await hre.ethers.getContractFactory("Auditability");
    const auditability = (await Auditability.attach(smart)) as Auditability;
    await auditability.store(id, hash).catch((err) => console.log(err.message));
  });

task("retrieve", "Retrieve hash on node")
  .addPositionalParam("id", "Id to map")
  .addParam("smart", "The smart contract's address")
  .setAction(async (taskArgs, hre) => {
    const { id, smart } = taskArgs;
    const Auditability = await hre.ethers.getContractFactory("Auditability");
    const auditability = Auditability.attach(smart) as Auditability;

    await auditability
      .retrieve(id)
      .then(console.log)
      .catch((err) => console.log(err.message));
  });

export default config;
