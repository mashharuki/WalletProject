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
const useContract = require('../contracts/UseContract');
// ABI
const abis = require('../contracts/ABI');
// contract address
const contractAddr = require('../contracts/Address');
// get contants 
const {
  RPC_URL,
  CHAIN_ID
} = require('./../utils/constants');
const { generateDID } = require('./did/did');
const { uploadFileToIpfs } = require('./ipfs/ipfs');

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
  var result = await useContract.sendTx(
    abi, 
    contractAddr.MYTOKEN_ADDRESS, 
    "mint", 
    [to, amount], 
    RPC_URL, 
    CHAIN_ID
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
  var result = await useContract.sendTx(
    abi, 
    contractAddr.MYTOKEN_ADDRESS, 
    "burnToken", 
    [to, (amount/1000000000000000000)], 
    RPC_URL, 
    CHAIN_ID
  );
    
  if(result == true) {
    // send ETH 
    var result = await useContract.sendEth(
      walletAddr, 
      (amount/10000000000000000000000), 
      RPC_URL, 
      CHAIN_ID
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
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
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
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
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
        RPC_URL, 
        CHAIN_ID
      ];
      // push
      txs.push(tx);
      // create tx info
      tx = [
        mytokenAbi, 
        contractAddr.MYTOKEN_ADDRESS, 
        "mint", 
        [receiveAddr, amount], 
        RPC_URL, 
        CHAIN_ID
      ];
      // push
      txs.push(tx);

      // call sendBatchTxs function
      result = await useContract.sendBatchTx(txs).then((result) => resultCheck(result));
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

  // generate DID document
  let {
    response,
    did
  } = await generateDID();
  logger.log("response:", response);
  // upload to ipfs
  await uploadFileToIpfs(response, addr);
  
  // get DID URL
  const didUrl = await did.getURI('short');
  // コントラクトのABI
  const abi = abis.FactoryABI;
  
  // set to Factory contract
  var result = await useContract.sendTx(
    abi, 
    contractAddr.FACTORY_ADDRESS, 
    "register", 
    [addr, didUrl], 
    RPC_URL, 
    CHAIN_ID
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
  // TO-DO
});
    
/**
 * DIDを利用して署名検証するAPI
 */
app.post('/api/verify', async(req, res) => {
  // TO-DO
});
    
/**
 * FactoryWalletのメソッドを実行するためのAPI (配列を渡せない課題あり)
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
  var result = await useContract.sendTx(
    abi, 
    contractAddr.FACTORY_ADDRESS, 
    methodName, 
    args, 
    RPC_URL, 
    CHAIN_ID
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
 * VCのCID情報をスマートコントラクトに登録するAPI
 * @param did DID
 * @param name VCのファイル名
 * @param cid CID情報
 */
app.post("/api/registerIpfs", async (req, res) => {
  logger.debug("Register Ipfs API開始");

  // リクエストパラメータから情報を取得する。
  var did = req.query.did;
  var name = req.query.name;
  var cid = req.query.cid;
  // コントラクトのABI
  const abi = abis.FactoryABI;
  
  // IPFSに登録
  var result = await useContract.sendTx(
    abi, 
    contractAddr.FACTORY_ADDRESS, 
    "updateVc", 
    [did, name, cid], 
    RPC_URL, 
    CHAIN_ID
  );

  if(result == true) {
    logger.debug("トランザクション送信成功");
    logger.log("Register Ipfs API終了")
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json({ result: 'success' });
  } else {
    logger.error("トランザクション送信失敗");
    logger.log("Register Ipfs API終了")
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json({ result: 'fail' });
  }
});

module.exports = {
  app,
  logger
};