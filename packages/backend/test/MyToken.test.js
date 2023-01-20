const chai = require("chai");
const BN = require("bn.js");
const { expect } = chai;
chai.use(require("chai-bn")(BN));

// MyToken コントラクトテスト用のコード
const MyToken = artifacts.require("MyToken");

contract("MyToken Contract test", accounts => {
    // トークン名
    const tokenName = "Test";
    // シンボル名
    const tokenSymbol = "TST";
    // アドレス
    const owner = accounts[0];
    const alice = accounts[1];
    const bob = accounts[2];

    let myToken;

    beforeEach (async () => {
        // create
        myToken = await MyToken.new(tokenName, tokenSymbol);
    });

    // 各変数の初期設定用テストコード
    describe ("initialization", () => {
        it ("gets the myToken name", async () => {
            const actual = await myToken.name();
            assert.equal(actual, tokenName, "name should match");
        });
        it ("gets the myToken symbol", async () => {
            const actual = await myToken.symbol();
            assert.equal(actual, tokenSymbol, "symbol should match");
        });
        it ("gets the myToken decimals", async () => {
            const actual = await myToken.decimals();
            assert.equal(actual, 18, "decimal should match");
        });
        it ("gets the myToken totalSupply", async () => {
            const actual = await myToken.totalSupply();
            assert.equal(actual, 0, "totalSupply should match");
        });
    });

    describe ("operate tokens!!", () => {
        it("mint", async () => {
            await myToken.mint(owner, 10000);
            const actual = await myToken.totalSupply();
            const balance = await myToken.balanceOf(owner);
            assert.equal(actual, 10000, "totalSupply should match");
            assert.equal(balance, 10000, "balance should match");
        });
        it("transfer", async () => {
            await myToken.mint(owner, 10000);
            const res = await myToken.transfer(alice, 6000, {from: owner});
            const balance = await myToken.balanceOf(owner);
            const balance2 = await myToken.balanceOf(alice);
            assert.equal(balance, 4000, "owner's balance should match");
            assert.equal(balance2, 6000, "alice's balance should match");
        });
        it("transfer2", async () => {
            await myToken.mint(alice, 10000);
            const res = await myToken.transfer(bob, 6000, {from: alice});
            const balance = await myToken.balanceOf(alice);
            const balance2 = await myToken.balanceOf(bob);
            assert.equal(balance, 4000, "alice's balance should match");
            assert.equal(balance2, 6000, "bob's balance should match");
        });
        it("approve", async () => {
            await myToken.approve(alice, 6000);
            const amount = await myToken.allowance(owner, alice);
            assert.equal(amount, 6000, "approved amount should match");
        });
        it("burn", async () => {
            await myToken.mint(owner, 10000);
            await myToken.burnToken(owner, 10000);
            const balance = await myToken.balanceOf(owner);
            assert.equal(balance, 0, "burned amount should match");
        });
        it("burn 2 ", async () => {
            await myToken.mint(alice, 10000, {from: owner});
            await myToken.burnToken(alice, 10000, {from: owner});
            const balance = await myToken.balanceOf(owner);
            assert.equal(balance, 0, "burned amount should match");
        });
        it("transferFrom", async () => {
            await myToken.mint(owner, 20000);
            const res = await myToken.transfer(alice, 6000, {from: owner});
            const balance = await myToken.balanceOf(alice);
            assert.equal(balance, 6000, "approved amount should match");

            await myToken.increaseAllowance(alice, 6000, {from: owner});
            await myToken.transferFrom(owner, bob, 6000, {from: alice});
            const balance2 = await myToken.balanceOf(bob);
            assert.equal(balance2, 6000, "transfered amount should match");
        });
    });
});