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
        await auditability.store(`id-${i}`, "hash");
      }
      expect(await auditability.hashesCount()).to.equal(10);
    });

    it("should return hash after retrieving stored hash", async function () {
      const { auditability } = await loadFixture(deployFixture);
      await auditability.store("id", "hash");
      expect(await auditability.retrieve("id")).to.equal("hash");
    });

    it("should revert after retrieving no stored hash", async function () {
      const { auditability } = await loadFixture(deployFixture);
      await expect(auditability.retrieve("some-id")).to.revertedWith(
        "Id not founded"
      );
    });

    it("should does not update id mapping to another hash", async function () {
      const { auditability } = await loadFixture(deployFixture);
      await auditability.store("id", "hash1");
      await expect(auditability.store("id", "hash2")).to.be.revertedWith(
        "Id can not updated"
      );
    });
  });
});
