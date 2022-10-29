require('dotenv/config');
const { ethers } = require('ethers');

// get Mnemonic code
const {
    MNEMONIC
} = process.env

/**
 * トランザクションを送信するメソッド
 * @param logger logger
 * @param abi コントラクトのABI
 * @param address コントラクトのアドレス
 * @param functionName ファクション名
 * @param args ファクションの引数
 * @param rpc_url 任意のAPI RPC エンドポイント
 * @param chainId チェーンID
 * @return 送信結果
 */
const sendTx = async(logger, abi, address, functionName, args, rpc_url, chainId) => {
    // contract interface
    var contract = new ethers.utils.Interface(abi);
    // crate contract function data
    var func = contract.encodeFunctionData(functionName, args);
    // create wallet object
    var wallet = new ethers.Wallet.fromMnemonic(MNEMONIC);
    // create provider
    var provider = new ethers.providers.JsonRpcProvider(rpc_url);
    // conncet provider
    wallet.connect(provider);
    // get nonce
    var nonce = await provider.getTransactionCount(wallet.address);

    // create tx data
    var tx = {
        gasPrice: 25000000000,
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

module.exports = { sendTx };