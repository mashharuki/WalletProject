import BloctoSDK from '@blocto/sdk';
import StartIcon from '@mui/icons-material/Start';
// mui関連をインポートする。
import AppBar from '@mui/material/AppBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Web3 from 'web3';
import './../assets/css/App.css';
import {
  baseURL, chainId, CONTRACT_ADDRESS, MYTOKEN_ADDRESS, RPC_URL
} from "./common/Constant";
import { RegisterContext } from './common/Contexts';
import Web3Menu from "./common/Web3Menu";
import Buy from './pages/Buy';
import Create from './pages/Create';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Txs from './pages/Tx/Txs';
import Upload from './pages/Upload';
import MyVC from './pages/Vc/MyVc';
import Verify from './pages/Verify';
import Wallets from './pages/Wallet/Wallets';


/**
 * Appコンポーネント
 */
function App() {
  // ステート変数
  const [currentAccount, setCurrentAccount] = useState(null);
  const [blocto, setBlocto] = useState(null);
  const [web3, setWeb3] = useState(null);

  // register status
  const isRegistered = false;

  /**
   * ウォレット接続ボタンを押した時の処理
   */
  const connectWalletAction = async () => {
    try {
      // create bloctoSDK object
      const bloctoSDK = new BloctoSDK({
        ethereum: {
            chainId: chainId, 
            rpc: RPC_URL,
        }
      });
      // create web3 object
      const provider = new Web3(RPC_URL);
      // request
      const signers = await bloctoSDK.ethereum.request({ method: 'eth_requestAccounts' });
  
      setBlocto(bloctoSDK);
      setWeb3(provider);
      setCurrentAccount(signers[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <RegisterContext.Provider value={{isRegistered}}>
        <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
        <Router>
          <div sx={{ flexGrow: 1 }}>
          { /* 画面上部に表示するAppBarコンポーネント */ }
            <AppBar position="static" color="transparent">
              <Toolbar>
                <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>
                  <strong>IDQ</strong>
                </Typography>
                { /* ウォレットに接続していなければログインアイコンを表示する。 */ }
                <Typography variant="h6" color="inherit">
                  {currentAccount === null ? (
                    <IconButton 
                      aria-label="more"
                      id="connect-wallet"
                      aria-haspopup="true"
                      onClick={connectWalletAction}
                    >
                      <StartIcon />
                    </IconButton>
                  ) :
                    /* 各画面に遷移するためのWeb3Menuコンポーネントを表示する。 */
                    <Web3Menu/>
                  }
                </Typography>
              </Toolbar>
            </AppBar>
            { currentAccount === null ? (
              <header className="App-header">
                <p>Welcome to IDQ Soul Wallet!!</p>
              </header>
            ) : (
              <Routes>
                <Route path="/" exact element={ <Home CONTRACT_ADDRESS={CONTRACT_ADDRESS} MYTOKEN_ADDRESS={MYTOKEN_ADDRESS} provider={web3} signer={currentAccount} baseURL={baseURL} /> } />
                <Route path="/home" exact element={ <Home CONTRACT_ADDRESS={CONTRACT_ADDRESS} MYTOKEN_ADDRESS={MYTOKEN_ADDRESS} provider={web3} signer={currentAccount} baseURL={baseURL} /> } />
                <Route path="/wallets" exact element={ <Wallets CONTRACT_ADDRESS={CONTRACT_ADDRESS} provider={web3} blocto={blocto} signer={currentAccount} baseURL={baseURL} /> } />
                <Route path="/create" exact element={ <Create CONTRACT_ADDRESS={CONTRACT_ADDRESS} provider={web3} blocto={blocto} signer={currentAccount} /> } />
                <Route path="/buy" exact element={ <Buy signer={currentAccount} baseURL={baseURL} /> } />
                <Route path="/txs" exact element={ <Txs provider={web3} blocto={blocto} signer={currentAccount} /> } />
                <Route path="/myvc" exact element={ <MyVC/> } />
                <Route path="/upload" exact element={ <Upload/> } />
                <Route path="/verify" exact element={ <Verify/> } />
                <Route path="*" exact element={ <NoPage/> } />
              </Routes>
            )}
          </div>
        </Router>
      </RegisterContext.Provider>
    </>
  );
}

export default App;