require('dotenv').config();

// get Mnemonic code
const {
  MNEMONIC,
  STRIPE_API_KEY
} = process.env

const express = require('express');
const app = express();
const log4js = require('log4js');
const { ethers } = require('ethers');
// 暗号化用のモジュールを読み込む
const crypto = require('crypto');
// did用のモジュールを読み込む
const ION = require('@decentralized-identity/ion-tools')
// ブロックチェーン機能のモジュールを読み込む
const utils = require('./Utils');
// ABI
const abis = require('../contracts/ABI');
// contract address
const contractAddr = require('../contracts/Address');

// log4jsの設定
log4js.configure('./log/log4js_setting.json');
const logger = log4js.getLogger("server");

// stripe用の変数定義
const stripe = require("stripe")(`${STRIPE_API_KEY}`);
app.use(express.static("public"));
app.use(express.json());

////////////////////////////////////////////////////////////
// APIの定義
////////////////////////////////////////////////////////////

/**
 * IDQTokenを発行するAPI
 * @param to 発行先アドレス
 * @param amount 発行量
 */
app.post('/api/mintIDQ', async(req, res) => {
  logger.log("発行用のAPI開始");

  var to = req.query.to;
  var amount = req.query.amount;

  // コントラクトのABI
  const abi = abis.MyTokenABI;

  // call send Tx function
  var result = await utils.sendTx(
    abi, 
    contractAddr.MYTOKEN_ADDRESS, 
    "mint", 
    [to, amount], 
    utils.RPC_URL, 
    utils.chainId
  );
    
  if(result == true) {
      logger.debug("トランザクション送信成功");
      logger.log("発行用のAPI終了");
      res.set({ 'Access-Control-Allow-Origin': '*' });
      res.json({ result: 'success' });
  } else {
      logger.error("トランザクション送信失敗");
      logger.log("発行用のAPI終了");
      res.set({ 'Access-Control-Allow-Origin': '*' });
      res.json({ result: 'fail' });
  }
});
    
/**
 * IDQTokenを償却するAPI
 * @param to 償却アドレス
 * @param amount 償却量
 * @param walletAddr ウォレットアドレス
 */
app.post('/api/burnIDQ', async(req, res) => {
  logger.log("償却用のAPI開始")

  var to = req.query.to;
  var amount = req.query.amount;
  var walletAddr = req.query.walletAddr;

  // コントラクトのABI
  const abi = abis.MyTokenABI;

  // call send Tx function
  var result = await utils.sendTx(
    abi, 
    contractAddr.MYTOKEN_ADDRESS, 
    "burnToken", 
    [to, (amount/1000000000000000000)], 
    utils.RPC_URL, 
    utils.chainId
  );
    
  if(result == true) {
    // send ETH 
    var result = await utils.sendEth(
      walletAddr, 
      (amount/10000000000000000000000), 
      utils.RPC_URL, 
      utils.chainId
    );

    logger.debug("トランザクション送信成功");
    logger.log("償却用のAPI終了")
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json({ result: 'success' });
  } else {
    logger.error("トランザクション送信失敗");
    logger.log("償却用のAPI終了")
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json({ result: 'fail' });
  }
});
    
/**
 * IDQTokenの残高を取得するAPI
 * @param addr 残高を取得するアドレス
 */
app.get('/api/balance/IDQ', async(req, res) => {
  logger.log("残高取得用のAPI開始");

  var addr = req.query.addr;

  // コントラクトのABI
  const abi = abis.MyTokenABI;
  
  // create wallet 
  const wallet = new ethers.Wallet.fromMnemonic(MNEMONIC);
  // create provider
  const provider = new ethers.providers.JsonRpcProvider(utils.RPC_URL);
  // create contract 
  var contract = new ethers.Contract(contractAddr.MYTOKEN_ADDRESS, abi, await provider.getSigner(wallet.address));

  const balance = await contract.callStatic.balanceOf(addr);

  logger.log("残高取得用のAPI終了");
  res.set({ 'Access-Control-Allow-Origin': '*' });
  res.json({ balance: balance });
});
    
/**
 * IDQTokenを送金するAPI
 * @param from 送金元のDID
 * @param to 送金先のDID
 * @param amount 総金額
 */
app.post('/api/send', async(req, res) => {
  logger.log("token送金用のAPI開始");

  // get params
  var from = req.query.from;
  var to = req.query.to;
  var amount = req.query.amount;  
  // コントラクトのABI
  const mytokenAbi = abis.MyTokenABI;
  const factoryAbi = abis.FactoryABI;
  // get wallet address
  logger.log("from:", from);
  logger.log("to:", to);
  logger.log("amount:", amount);

  /**
   * check function
   */
  const resultCheck = (result) => {
    if(result == true) {
      logger.debug("トランザクション送信成功");
      logger.log("token送金用のAPI終了")
      res.set({ 'Access-Control-Allow-Origin': '*' });
      res.json({ result: 'success' });
    } else {
      logger.error("トランザクション送信失敗");
      logger.log("token送金用のAPI終了");
      res.set({ 'Access-Control-Allow-Origin': '*' });
      res.json({ result: 'fail' });
    }
  }
      
  try {
    // create wallet 
    const wallet = new ethers.Wallet.fromMnemonic(MNEMONIC);
    // create provider
    const provider = new ethers.providers.JsonRpcProvider(utils.RPC_URL);
    // get signer 
    const signer = await provider.getSigner(wallet.address)
    // create mytoken contract 
    var myTokenContract = new ethers.Contract(contractAddr.MYTOKEN_ADDRESS, mytokenAbi, signer);
    // create factory contract
    var factoryContract = new ethers.Contract(contractAddr.FACTORY_ADDRESS, factoryAbi, signer);
    // get address from did
    let fromAddr = await factoryContract.callStatic.addrs(from);
    let receiveAddr = await factoryContract.callStatic.addrs(to);
    // get addr from did
    const balance = await myTokenContract.callStatic.balanceOf(fromAddr);
  
    logger.log("fromAddr:", fromAddr);
    logger.log("receiveAddr:", receiveAddr);
    logger.log("送信元のbalance:", Number(balance._hex));
    
    // check balance
    if(Number(balance._hex) >= amount) {
      // 結果を格納するための変数
      var result;

      // Arrary for Tx 
      const txs = [];
      // create tx info
      var tx = [
        mytokenAbi, 
        contractAddr.MYTOKEN_ADDRESS, 
        "burnToken", 
        [fromAddr, amount],
        utils.RPC_URL, 
        utils.chainId
      ];
      // push
      txs.push(tx);
      // create tx info
      tx = [
        mytokenAbi, 
        contractAddr.MYTOKEN_ADDRESS, 
        "mint", 
        [receiveAddr, amount], 
        utils.RPC_URL, 
        utils.chainId
      ];
      // push
      txs.push(tx);

      // call sendBatchTxs function
      result = await utils.sendBatchTx(txs).then((result) => resultCheck(result));
    } else {
      logger.error("トランザクション送信失敗");
      logger.error("残高不足");
      logger.log("token送金用のAPI終了");
      res.set({ 'Access-Control-Allow-Origin': '*' });
      res.json({ result: 'fail' });
    }
  } catch(err) {
    logger.error("トランザクション送信失敗");
    logger.error("エラー原因：", err);
    logger.log("token送金用のAPI終了");
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json({ result: 'fail' });
  }
});
    
/**
 * DIDを作成するAPI
 * @param addr 登録するアドレス
 */
app.post('/api/create', async(req, res) => {
  logger.log("DID作成用のAPI開始");

  var addr = req.query.addr;
  // create key pair
  let authnKeys = await ION.generateKeyPair();
  // new DID
  let did = new ION.DID({
    content: {
      publicKeys: [
        {
          id: 'key-1',
          type: 'EcdsaSecp256k1VerificationKey2019',
          publicKeyJwk: authnKeys.publicJwk,
          purposes: [ 'authentication' ]
        }
      ],
      services: [
        {
          id: 'idq',
          type: 'LinkedDomains',
          serviceEndpoint: 'http://idq.vercel.app/'
        }
      ]
    }
  });

  // anchor DID
  const requestBody = await did.generateRequest();
  const request = new ION.AnchorRequest(requestBody);
  let response = await request.submit();
  logger.log("response:", response);
  
  // get DID URL
  const didUrl = await did.getURI('short');
  // コントラクトのABI
  const abi = abis.FactoryABI;
  
  // set to Factory contract
  var result = await utils.sendTx(
    abi, 
    contractAddr.FACTORY_ADDRESS, 
    "register", 
    [addr, didUrl], 
    utils.RPC_URL, 
    utils.chainId
  );

  if(result == true) {
    logger.debug("トランザクション送信成功");
    logger.log("DID作成用のAPI終了")
    logger.log("DID:", didUrl);
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json({ result: 'success' });
  } else {
    logger.error("トランザクション送信失敗");
    logger.log("DID作成用のAPI終了")
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json({ result: 'fail' });
  }
});
    
    
/**
 * DIDドキュメントを検索するAPI
 */
app.get('/api/resolve', async(req, res) => {
  var uri = req.query.uri;
  // resolve
  const response = await ION.resolve(uri);
  logger.log("response:", response);

  res.set({ 'Access-Control-Allow-Origin': '*' });
  res.json({ result : response });
});
    
/**
 * DIDを利用して署名処理するAPI
 */
app.post('/api/sign', async(req, res) => {
      /*
      const privateKey = JSON.parse(await fs.readFile('privateKey.json'))
      const myData = 'This message is signed and cannot be tampered with'
      const signature = await ION.signJws({
        payload: myData,
        privateJwk: privateKey
      });
    
      res.json({ signature : signature });
      */
});
    
/**
 * DIDを利用して署名検証するAPI
 */
app.post('/api/verify', async(req, res) => {
      /*
      const publicKey = JSON.parse(await fs.readFile('publicKey.json'))
      verifiedJws = await ION.verifyJws({
        jws: signature,
        publicJwk: publicKey
      })
      console.log("Verify with my public key:", verifiedJws)
    
      res.json({ verifiedJws : verifiedJws });
      */
});
    
/**
 * FactoryWalletのメソッドを実行するためのAPI
 * @param methodName メソッド名
 * @param args 引数
 */
app.post('/api/excute/factory', async(req, res) => {
  logger.log("FactoryWalletのメソッドを実行するためのAPI開始")
  // 呼び出す関数名
  var methodName = req.query.methodName;
  // 関数の引数
  var args = req.query.args;

  // コントラクトのABI
  const abi = abis.FactoryABI;

  // call send Tx function
  var result = await utils.sendTx(
    abi, 
    contractAddr.FACTORY_ADDRESS, 
    methodName, 
    args, 
    utils.RPC_URL, 
    utils.chainId
  );
    
  if(result == true) {
    logger.debug("トランザクション送信成功");
    logger.log("FactoryWalletのメソッドを実行するためのAPI終了")
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json({ result: 'success' });
  } else {
    logger.error("トランザクション送信失敗");
    logger.log("FactoryWalletのメソッドを実行するためのAPI終了")
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json({ result: 'fail' });
  }
});

/**
 * stripeのPayment elementを使うためのAPI
 * ※ テスト用 (1400円分)
 */
app.post("/create-payment-intent", async (req, res) => {
  logger.debug("Payment API開始");

  // create paymentIntent 
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1400,
    currency: "jpy",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.set({ 'Access-Control-Allow-Origin': '*' });
  // send
  res.send({
    clientSecret: paymentIntent.client_secret,
  });

  logger.debug("Payment API終了");
});

/**
 * VCを生成し、IPFSに登録するAPI
 */
app.post("/api/registerIpfs", async (req, res) => {
  logger.debug("Register Ipfs API開始");

  // VCの作成(テンプレから生成)

  // ブロックチェーンに署名

  // 生成済みのVCを取得する。(最初のモックアップ)
  
  // IPFSに登録

  res.set({ 'Access-Control-Allow-Origin': '*' });
  // send
  res.send({
    result: true
  });

  logger.debug("Register Ipfs API終了");
});

module.exports = {
  app,
  logger
};