/**
 * APIサーバー設定ファイル
 */

require('dotenv').config()
// get Mnemonic code
const {
  MNEMONIC,
} = process.env

// Webサーバーの起動
const express = require('express');
const log4js = require('log4js');
const app = express();
// ポート番号
const portNo = 3001;
// log4jsの設定
log4js.configure('./log/log4js_setting.json');
const logger = log4js.getLogger("server");
const ip = require('ip');
const { ethers, BigNumber } = require('ethers');

// 起動
app.listen(portNo, () => {
    logger.debug('起動しました', `https://${ip.address()}:${portNo}`);
    console.log('起動しました', `https://${ip.address()}:${portNo}`)
});

// 暗号化用のモジュールを読み込む
const crypto = require('crypto');
// did用のモジュールを読み込む
const ION = require('@decentralized-identity/ion-tools')

// ブロックチェーン機能のモジュールを読み込む
const utils = require('./Utils');
// ABI
const abis = require('./contracts/ABI');

// IDQTokenのコントラクトアドレス
const MYTOKEN_ADDRESS = "0x505869E3B5Ef52a5Db123387fe2d188c44b27b25";
// Factoryコントラクトのアドレス
const FACTORY_ADDRESS= "0x177acf501eF7d2b090d94fd3bd2BE773736598E1";

// APIの定義

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
  const chainId = 43113;

  // call send Tx function
  var result = await utils.sendTx(logger, abi, MYTOKEN_ADDRESS, "mint", [to, amount], 'https://api.avax-test.network/ext/bc/C/rpc', chainId);

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
 * @param to 発行先アドレス
 * @param amount 償却量
 */
app.post('/api/burnIDQ', async(req, res) => {
  logger.log("償却用のAPI開始")

  var to = req.query.to;
  var amount = req.query.amount;

  // コントラクトのABI
  const abi = abis.MyTokenABI;
  //const chainId = req.query.chainId;
  const chainId = 43113;

  // call send Tx function
  var result = await utils.sendTx(logger, abi, MYTOKEN_ADDRESS, "burnToken", [to, amount], 'https://api.avax-test.network/ext/bc/C/rpc', chainId);

  if(result == true) {
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
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  // create contract 
  var contract = new ethers.Contract(MYTOKEN_ADDRESS, abi, await provider.getSigner(wallet.address));

  const balance = await contract.callStatic.balanceOf(addr);

  logger.log("残高取得用のAPI終了");
  res.set({ 'Access-Control-Allow-Origin': '*' });
  res.json({ balance: balance });
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
          id: 'domain-1',
          type: 'LinkedDomains',
          serviceEndpoint: 'https://foo.example.com'
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
  const chainId = 43113;
  // set to Factory contract
  var result = await utils.sendTx(logger, abi, FACTORY_ADDRESS, "register", [addr, didUrl], 'https://api.avax-test.network/ext/bc/C/rpc', chainId);

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

  var methodName = req.query.methodName;
  var args = req.query.args;

  // コントラクトのABI
  const abi = abis.FactoryABI;
  //const chainId = req.query.chainId;
  const chainId = 43113;

  // call send Tx function
  var result = await utils.sendTx(logger, abi, FACTORY_ADDRESS, methodName, args, 'https://api.avax-test.network/ext/bc/C/rpc', chainId);

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

// QRコード画面を表示する。
app.use('/', express.static('./../docs'));