const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const { beforeEach } = require("mocha")
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Our Token Unit Tests", () => {
      let ourToken, deployer, user1
      beforeEach(async () => {
        const accounts = ethers.getNamedAccounts
        deployer = accounts.deployer
        user1 = accounts.user1

        await deployments.fixture(["all"])
        ourToken = await ethers.getContract("OurToken", deployer)
      })
    })
