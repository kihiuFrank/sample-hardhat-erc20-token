const { assert } = require("chai")
const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Our Token Unit Tests", () => {
      let ourToken, deployer, user1
      beforeEach(async () => {
        const accounts = await getNamedAccounts()
        deployer = accounts.deployer
        user1 = accounts.user1

        await deployments.fixture(["all"])
        ourToken = await ethers.getContract("OurToken", deployer)
      })

      it("was deployed", async () => {
        assert(ourToken.address)
      })

      describe("constructor", () => {
        it("has correct initial supply of tokens", async () => {
          const totalSupply = await ourToken.totalSupply()
          assert.equal(totalSupply.toString(), INITIAL_SUPPLY)
        })

        it("initializes the token name and the symbol correctly", async () => {
          const tokenName = (await ourToken.name()).toString()
          assert.equal(tokenName, "OurToken")

          const tokenSymbol = (await ourToken.symbol()).toString()
          assert.equal(tokenSymbol, "OT")
        })
      })
    })
