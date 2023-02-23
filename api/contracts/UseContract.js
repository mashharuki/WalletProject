require('dotenv/config');
const { ethers } = require('ethers');
const { KmsEthersSigner } = require('aws-kms-ethers-signer');
const log4js = require('log4js');
const { KEY_ID, REGION_ID } = require('../utils/constants');
// log4jsの設定
log4js.configure('./log/log4js_setting.json');
const logger = log4js.getLogger("server");

// get Mnemonic code
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
} = process.env

/**
 * AWS KMS上の鍵を使ってイーサリアムクライアントインスタンスを生成するメソッド
 */
const createKmsSigner = () => {
    // create singer object
    const signer = new KmsEthersSigner({
        keyId: KEY_ID,
        kmsClientConfig: {
            region: REGION_ID,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY
            }
        },
    });

    return signer;
}

/**
 * トランザクションを送信するメソッド
 * @param abi コントラクトのABI
 * @param address コントラクトのアドレス
 * @param functionName ファクション名
 * @param args ファクションの引数
 * @param rpc_url 任意のAPI RPC エンドポイント
 * @param chainId チェーンID
 * @return 送信結果
 */
const sendTx = async(abi, address, functionName, args, rpc_url, chainId) => {
    // contract interface
    var contract = new ethers.utils.Interface(abi);
    // crate contract function data
    var func = contract.encodeFunctionData(functionName, args);
    // create wallet object
    var wallet = createKmsSigner();
    // create provider
    var provider = new ethers.providers.JsonRpcProvider(rpc_url);
    // conncet provider
    wallet.connect(provider);
    // get nonce
    var nonce = await provider.getTransactionCount(await wallet.getAddress());

    // create tx data
    var tx = {
        gasPrice: 30000000000,
        gasLimit: 185000,
        data: func,
        to: address,
        nonce: nonce,
        chainId: chainId,
    }
    // sign tx
    var signedTransaction = await wallet.signTransaction(tx).then(ethers.utils.serializeTransaction(tx));

    try {
        // send tx
        const res = await provider.sendTransaction(signedTransaction);
        logger.log("Tx send result:", res);
    } catch(e) {
        logger.error("Tx send error:", e);
        return false;
    }

    return true;
}

/**
 * 複数のトランザクションを一括で処理するメソッド
 * @param txs トランザクションデータの配列
 * @return 送信結果
 */
const sendBatchTx = async(txs) => {
    // logger.log("txs:", txs);
    // get tx count
    const count = txs.length;
    // Array for signedTx
    const signedTxs = [];

    for(var i = 0; i< count; i++) {
        // contract interface
        var contract = new ethers.utils.Interface(txs[i][0]);
        // crate contract function data
        var func = contract.encodeFunctionData(txs[i][2], txs[i][3]);
        // create wallet object
        var wallet = createKmsSigner();
        // create provider
        var provider = new ethers.providers.JsonRpcProvider(txs[i][4]);
        // conncet provider
        wallet.connect(provider);
        // get nonce
        var nonce = await provider.getTransactionCount(await wallet.getAddress()) + i;
        // create tx data
        var tx = {
            gasPrice: 30000000000,
            gasLimit: 185000,
            data: func,
            to: txs[i][1],
            nonce: nonce,
            chainId: txs[i][5],
        }
        // sign tx
        var signedTransaction = await wallet.signTransaction(tx).then(ethers.utils.serializeTransaction(tx));
        logger.log("signedTransaction:", signedTransaction);
        // push
        signedTxs.push(signedTransaction);
    }

    // execute
    try {
        // send tx
        var res;
        
        for(var i = 0; i< count; i++) {
            res = await provider.sendTransaction(signedTxs[i]);
            logger.log("Tx send result:", res);
        }
    } catch(e) {
        logger.error("Tx send error:", e);
        return false;
    }

    return true;
};

/**
 * 送金処理のみのトランザクションメソッド
 * @param to 送金先アドレス
 * @param value 送金額
 * @param rpc_url 任意のAPI RPC エンドポイント
 * @param chainId チェーンID
 * @return 送信結果
 */
const sendEth = async(to, value, rpc_url, chainId) => {
    // create wallet object
    var wallet = createKmsSigner();
    // create provider
    var provider = new ethers.providers.JsonRpcProvider(rpc_url);
    // conncet provider
    wallet.connect(provider);
    // get nonce
    var nonce = await provider.getTransactionCount(await wallet.getAddress());

    logger.log("send ETH amount:", ethers.utils.parseEther(value.toString())._hex);
   
    // create tx data
    var tx = {
        gasPrice: 250000000000,
        gasLimit: 185000,
        to: to,
        nonce: nonce,
        chainId: chainId,
        value: ethers.utils.parseEther(value.toString())._hex
    }
    // sign tx
    var signedTransaction = await wallet.signTransaction(tx).then(ethers.utils.serializeTransaction(tx));

    try {
        // send tx
        const res = await provider.sendTransaction(signedTransaction);
        logger.log("Tx send result:", res);
    } catch(e) {
        logger.error("Tx send error:", e);
        return false;
    }

    return true;
}


module.exports = { 
    createKmsSigner,
    sendTx,
    sendBatchTx, 
    sendEth 
};