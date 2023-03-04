// mui関連をインポートする。
import StartIcon from '@mui/icons-material/Start';
import AppBar from '@mui/material/AppBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './../assets/css/App.css';
import { RegisterContext } from './common/Contexts';
import Web3Menu from "./common/Web3Menu";
import {
  connectWallet
} from './hooks/UseContract';
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

  // register status
  const isRegistered = false;

  /**
   * ウォレット接続ボタンを押した時の処理
   */
  const connectWalletAction = async () => {
    try {
      // call createContractObject function
      const { signer } = await connectWallet();

      setCurrentAccount(signer);
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
                <Route path="/" exact element={ <Home signer={currentAccount} /> } />
                <Route path="/home" exact element={ <Home signer={currentAccount} /> } />
                <Route path="/wallets" exact element={ <Wallets signer={currentAccount} /> } />
                <Route path="/create" exact element={ <Create signer={currentAccount} /> } />
                <Route path="/buy" exact element={ <Buy signer={currentAccount} /> } />
                <Route path="/txs" exact element={ <Txs signer={currentAccount} /> } />
                <Route path="/myvc" exact element={ <MyVC signer={currentAccount} /> } />
                <Route path="/upload" exact element={ <Upload signer={currentAccount} /> } />
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