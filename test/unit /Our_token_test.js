const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Our Token Unit Tests", () => {
      //Multipler is used to make reading the math easier because of the 18 decimal points
      const multiplier = 10 ** 18
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

      describe("transfers", () => {
        it("transfers tokens successfully to an address", async () => {
          const tokensToSend = ethers.utils.parseEther("10")
          await ourToken.transfer(user1, tokensToSend)
          expect(await ourToken.balanceOf(user1)).to.equal(tokensToSend)
        })
        it("emits a transfer event, when a transfer occurs", async () => {
          await expect(
            ourToken.transfer(user1, (10 * multiplier).toString())
          ).to.emit(ourToken, "Transfer")
        })
      })
    })
