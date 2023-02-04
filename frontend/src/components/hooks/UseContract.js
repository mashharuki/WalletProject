/**
 * スマートコントラクトやウォレット接続などのWeb3関連の処理をまとめたhookコンポーネントファイル
 */
import BloctoSDK from '@blocto/sdk';
import Web3 from 'web3';
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

      return {
            bloctoSDK,
            signers
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
      const MyTokenContract = createContractObject(MyToken.abi, MYTOKEN_ADDRESS);
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



