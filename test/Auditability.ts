import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Auditability", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const Auditability = await hre.ethers.getContractFactory("Auditability");
    const auditability = await Auditability.deploy();
    return { auditability, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("there are no hashes within the contract", async function () {
      const { auditability } = await loadFixture(deployFixture);
      expect(await auditability.hashesCount()).to.equal(0);
    });
  });

  describe("Storing hashes", function () {
    it("should be 10 hashesCount after adding 10 hashes", async function () {
      const { auditability } = await loadFixture(deployFixture);
      for (let i = 0; i < 10; i++) {
        await auditability.storeHash("hash");
      }
      expect(await auditability.hashesCount()).to.equal(10);
    });

    it("should return true after retrieving stored hash", async function () {
      const { auditability } = await loadFixture(deployFixture);
      await auditability.storeHash("hash");
      expect(await auditability.recoverHash("hash")).to.true;
      expect(await auditability.recoverHash("another-hash")).to.false;
    });

    it("should return false after retrieving no stored hash", async function () {
      const { auditability } = await loadFixture(deployFixture);
      await auditability.storeHash("hash");
      expect(await auditability.recoverHash("another-hash")).to.false;
    });
  });
});
