/**
 * スマートコントラクトやウォレット接続などのWeb3関連の処理をまとめたhookコンポーネントファイル
 */
import BloctoSDK from '@blocto/sdk';
import Web3 from 'web3';
import MultiSigWallet from './../../contracts/MultiSigWallet.json';
import MyToken from './../../contracts/MyToken.json';
import WalletFactory from './../../contracts/WalletFactoryV4.json';
import { CHAIN_ID, CONTRACT_ADDRESS, MYTOKEN_ADDRESS, RPC_URL } from "./../common/Constant";

/**
 * getProvider メソッド
 */
export const getProvider = () => {
      // get provider
      const provider = new Web3(RPC_URL);
      return provider;
};

/**
 * createContractObject メソッド
 * @param contractAbi コントラクトABI
 * @param contractAddress コントラクトアドレス
 */
const createContractObject = ( contractAbi, contractAddress) => {
      // get provider
      const provider = getProvider();
      // create Contract Object
      const ContractObject = new provider.eth.Contract(contractAbi, contractAddress);
      return ContractObject;
};

/**
 * connectWallet メソッド
 */
export const connectWallet = async() => {
      // create bloctoSDK object
      const bloctoSDK = new BloctoSDK({
            ethereum: {
                chainId: CHAIN_ID, 
                rpc: RPC_URL,
            }
      });
      // request
      const signers = await bloctoSDK.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = signers[0]

      return {
            bloctoSDK,
            signer
      };
};

/**
 * getDidメソッド
 * @param signer ログイン中のsignerオブジェクト
 */
export const getDid = async(signer) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get did info
      const result = await FactoryContract.methods.dids(signer).call();
      return result;
};

/**
 * getIdqTokenBalanceOf メソッド
 * @param signer ログイン中のsignerオブジェクト
 */
export const getIdqTokenBalanceOf = async(signer) => {
      // call createContractObject メソッド
      const MyTokenContract = await createContractObject(MyToken.abi, MYTOKEN_ADDRESS);
      // get token balance
      const num = await MyTokenContract.methods.balanceOf(signer).call();
      return num;
};

/**
 * getRegisterStatusメソッド
 * @param signer ログイン中のsignerオブジェクト
 */
export const getRegisterStatus = async(signer) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get status info
      var status = await FactoryContract.methods.isRegistered(signer).call();
      return status;
};

/**
 * getVcsメソッド
 * @param did ログイン中のdid情報
 */
export const getVcs = async(did) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get Verifiable Credentials info
      var vcs = await FactoryContract.methods.getVcs(did).call();
      return vcs;
};

/**
 * walletsCountメソッド
 */
export const walletsCount = async() => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get wallet addresses
      const count = await FactoryContract.methods.walletsCount().call();
      return count;
};


/**
 * getWalletsメソッド
 * @param count count 
 * @param start start
 */
export const getWallets = async(count, start) => {
      // call createContractObject メソッド
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get Verifiable Credentials info
      const multiSigWallets = await FactoryContract.methods.getWallets(count, start).call();
      return multiSigWallets;
};

/**
 * getWalletInfoメソッド
 * @param addr ウォレットアドレス
 */
export const getWalletInfo = async(addr) => {
      // call createContractObject メソッド
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      // get Verifiable Credentials info
      const wName = await WalletContract.methods.getName().call();
      const required = await WalletContract.methods.getRequired().call();
      const counts = await WalletContract.methods.getOwnersCount().call();
      
      return {
            wName,
            required,
            counts
      };
};

/**
 * getApprovalCount メソッド
 * @param addr ウォレットアドレス
 * @param index ウォレットID
 */
export const getApprovalCount = async(addr, index) => {
      // call createContractObject メソッド
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      // 承認済みの数を求める
      const approvement = await WalletContract.methods._getApprovalCount(index).call();

      return approvement;
}; 

/**
 * getRequired メソッド
 * @param addr ウォレットアドレス
 */
export const getRequired = async(addr) => {
      // call createContractObject メソッド
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      // 閾値を取得する。
      const req = await WalletContract.methods.getRequired().call();

      return req;
}; 

/**
 * getTxs メソッド
 * @param addr ウォレットアドレス
 */
export const getTxs = async(addr) => {
      // call createContractObject メソッド
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      // トランザクションの情報を取得する。
      const transactions = await WalletContract.methods.getTxs().call();

      return transactions;
};