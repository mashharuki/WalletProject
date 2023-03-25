/**
 * ======================================================================
 * The Test Code for WalletFactory Contract + MyToken Contract
 * ======================================================================
 */

const truffleAssert = require("truffle-assertions");
const WalletFactory = artifacts.require("WalletFactoryV4");
const MyToken = artifacts.require("MyToken");

/**
 * test
 */
contract("MultiSigWallet & MyToken Contract tests!!", accounts => {

    // owner's address
    const owners = [
        accounts[0],
        accounts[1],
        accounts[2]
    ];
    // required
    const required = 2;
    // variable for MultiSigWallet Contract
    var multiSigWallet;
    var factory;
    // variable for MyToken Contract
    var myToken;
    // sample DID
    var did = "did:ion:er....rer";
    // sample VC name
    var vcName = "testVC";
    // sample DID
    var cid = "09i464xi6964wugjtioe";

    /**
     * addWallet function
     */
    async function addWallets (factory, count) {
        // wallet name
        const name = "testWallet";

        for (let i=0; i < count; i++) {
            // create MultiSigWallet Contract
            await factory.createWallet(`${name} ${i}`, owners, required);
        }
    }

    /**
     * テスト実行前の準備　
     */
    beforeEach (async () => {
        // MyTokenコントラクトのインスタンスを生成
        myToken = await MyToken.new("MyToken", "TST", {
            from: accounts[0],
            gas: 5000000
        });
        // factoryコントラクトインスタンスを生成
        factory = await WalletFactory.new();
    });

    /**
     * init test
     */
    describe ("init test", async() => {
        it("check myToken Owner", async () => {
            // get owner address 
            var ownerAddress = await myToken.owner();
            // check owner address
            assert.equal(ownerAddress, owners[0], "owner address must be match!!");
        });

        it("check Factory Owner", async () => {
            // get owner address 
            var ownerAddress = await factory.owner();
            // check owner address
            assert.equal(ownerAddress, owners[0], "owner address must be match!!");
        });

        it("check num of wallet", async () => {
            // get num of wallet
            var num = await factory.walletsCount();
            // check num of wallet
            assert.equal(num, 0, "num of wallet must be match!!");
        });
        /*
        it("check num of MultiSigWallet", async () => {
            // get num of wallet
            var num = await factory.getWallets(10, 0);
            // check num of wallet
            assert.equal(num, [], "num of MultiSigWallet must be match!!");
        });
        */
       
        it ("gets the myToken name", async () => {
            const actual = await myToken.name();
            assert.equal(actual, "MyToken", "name should match");
        });

        it ("gets the myToken symbol", async () => {
            const actual = await myToken.symbol();
            assert.equal(actual, "TST", "symbol should match");
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

    /**
     * Factory test
     */
    describe ("Factory test", async() => {
        it("create wallet", async () => {
            await addWallets(factory, 1);
            // get num of wallet
            var num = await factory.walletsCount();
            // check num of wallet
            assert.equal(num, 1, "num of wallet must be match!!");
        });
    });

    describe ("varying limits && offset", async () => { 
        // before test
        beforeEach (async () => {
            await addWallets(factory, 30);
        });

        // 10個のインスタンスを返すかテスト
        it ("returns 10 results when limit requested is 10", async () => {
            const wallets = await factory.getWallets(10, 0);
            assert.equal(wallets.length, 10, "results size should be 10");
        });
        // 20個のインスタンスを返すかテスト
        it ("returns 20 results when limit requested is 20", async () => {
            const wallets = await factory.getWallets(20, 0);
            assert.equal(wallets.length, 20, "results size should be 20");
        });
        // 20個のインスタンスを返すかテスト
        it ("returns 30 results when limit requested is 30", async () => {
            const wallets = await factory.getWallets(30, 0);
            assert.equal(wallets.length, 20, "results size should be 20");
        });
        // 20個のインスタンスを返すかテスト
        it ("returns 30 results when limit requested is 30", async () => {
            const wallets = await factory.getWallets(30, 20);
            assert.equal(wallets.length, 10, "results size should be 20");
        });
        // 20個のインスタンスを返すかテスト
        it ("returns 30 results when limit requested is 30", async () => {
            const wallets = await factory.getWallets(30, 10);
            assert.equal(wallets.length, 20, "results size should be 20");
        });
    });

    describe ("register test", async () => { 
        it ("register", async () => {
            // set
            await factory.register(owners[1], did);
            // get did
            const didData = await factory.dids(owners[1]);
            // check
            assert.equal(did, didData, "did data must be match!!");
        });
        // 異常系
        it ("register 2", async () => {
            // check
            await truffleAssert.reverts(
                factory.register(owners[2], did, { from : owners[1] })
            );
        });
        // 異常系2
        it ("register 3", async () => {
            // set
            await factory.register(owners[2], did);
            // check
            await truffleAssert.reverts(
                factory.register(owners[2], did)
            );
        });
    });

    describe ("VC info test", async () => { 
        it ("register", async () => {
            // register did
            await factory.register(owners[1], did);
            // register vc 
            await factory.updateVc(did, vcName, cid);
            // get vc info
            var result = await factory.getVcs(did);
            // check
            assert.equal(result.length, 1, "VcInfo Array's length must be match!");
        });
        it ("check register info", async () => {
            // register did
            await factory.register(owners[1], did);
            // register vc 
            await factory.updateVc(did, vcName, cid);
            // get vc info
            var result = await factory.getVcs(did);
            // check
            assert.equal(result[0].name, vcName, "VC name must be match!");
            assert.equal(result[0].cid, cid, "CID must be match!");
        });
        it ("register ✖️ 10", async () => {
            // register did
            await factory.register(owners[1], did);

            for (let i=0; i < 10; i++) {
                // register vc 
                await factory.updateVc(did, `${vcName}:${i}`, cid);
            }
    
            // get vc info
            var result = await factory.getVcs(did);
            // check
            assert.equal(result.length, 10, "VcInfo Array's length must be match!");
        });
        it ("register ✖️ 30", async () => {
            // register did
            await factory.register(owners[1], did);
           
            for (let i=0; i < 30; i++) {
                // register vc 
                await factory.updateVc(did, `${vcName}:${i}`, cid);
            }

            // get vc info
            var result = await factory.getVcs(did);
            // check
            assert.equal(result.length, 30, "VcInfo Array's length must be match!");
        });
    });
});

