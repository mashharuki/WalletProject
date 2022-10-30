// mui関連のコンポーネントのインポート
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import superAgent from 'superagent';
import ActionButton2 from '../common/ActionButton2';
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import './../../assets/css/App.css';
import MyToken from './../../contracts/MyToken.json';
import WalletFactory from './../../contracts/WalletFactoryV4.json';

/** 
 * StyledPaperコンポーネント
 */
 const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 400,
    //minHeight: 200,
    backgroundColor: 'rgb(150, 144, 144)'
}));

/**
 * Homeコンポーネント
 */
const Home = (props) => {
    // 引数からデータを取得する。
    const {
        CONTRACT_ADDRESS,
        MYTOKEN_ADDRESS,
        provider,
        signer,
        blocto,
        RPC_URL  
    } = props;

    const [balance, setBalance] = useState(0);
    const [isLogined, setIsLogined] = useState(false);
    const [did, setDid] = useState(null);
    const [fullDid, setFullDid] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successFlg, setSuccessFlg] = useState(false);
    const [failFlg, setFailFlg] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [baseURL, setBaseURL] = useState('http://localhost:3001');

    /**
     * sign in/ sign up function 
     */
    const signInAction = async() => {
        // Factory object
        const FactoryContract = new provider.eth.Contract(WalletFactory.abi, CONTRACT_ADDRESS);
        // 登録ステータスを確認する。
        const status = await FactoryContract.methods.isRegistered(signer).call();
        console.log("status:", status);
        
        if(status) { // 登録済みの場合
            // DIDを取得する。
            const didData = await FactoryContract.methods.dids(signer).call();
            console.log("didData :", didData);
            // short
            var modStr = didData.substr(0, 9) + '...' + didData.substr(didData.length - 3, 3)
            setDid(modStr);
            setFullDid(didData);
            setIsLogined(true);
        } else { // 未登録の場合

            var result;

            setIsLoading(true);
            // DID作成APIを呼び出す
            superAgent
                .post(baseURL + '/api/create')
                .query({addr: signer})
                .end(async(err, res) => {
                    if (err) {
                        console.log("DID作成用API呼び出し中に失敗", err);
                        // popUpメソッドの呼び出し
                        popUp(false, "failfull...");
                        setIsLogined(false);
                        setIsLoading(false);
                        return err;
                    }

                    // DIDを取得する。
                    const result = await FactoryContract.methods.dids(signer).call();
                    var modStr = result.substr(0, 9) + '...' + result.substr(result.length - 3, 3);

                    setDid(modStr);
                    setFullDid(result);
                    console.log("DID作成用API呼び出し結果：", result);
                    // popUpメソッドの呼び出し
                    popUp(true, "successfull!!");
                    setIsLogined(true);
                    setIsLoading(false);     
                });
        }
    }

    /**
     * ポップアップ時の処理を担当するメソッド
     * @param flg true：成功 false：失敗
     */
     const popUp = (flg) => {
        // 成功時と失敗時で処理を分岐する。
        if(flg === true) {
            // ステート変数を更新する。
            setSuccessFlg(true);
            setShowToast(true);       
            // 5秒後に非表示にする。
            setTimeout(() => {
                setSuccessFlg(false);
                setShowToast(false);             
            }, 5000);
        } else {
            // ステート変数を更新する。
            setFailFlg(true);
            setShowToast(true);     
            // 5秒後に非表示にする。
            setTimeout(() => {
                setFailFlg(false);
                setShowToast(false);
            }, 5000);
        }
    };

    useEffect(()=> {
        /**
         * init
         */
        const init = async() => {
            // コントラクト用のインスタンスを生成する。
            const instance = new provider.eth.Contract(MyToken.abi, MYTOKEN_ADDRESS);
            // 残高を取得する
            const num = await instance.methods.balanceOf(signer).call();
            setBalance(num);
        }
        init();
    }, []);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Box 
                sx={{ 
                    flexGrow: 1, 
                    overflow: "hidden", 
                    px: 3, 
                    mt: 10, 
                    height: '80vh'
                }}
            >
                <StyledPaper 
                    sx={{
                        my: 1, 
                        mx: "auto", 
                        p: 0, 
                        borderRadius: 4, 
                        marginTop: 4
                    }}
                >
                    {isLoading ? (
                        <Grid container justifyContent="center">
                            <div className="loading">
                                <p><LoadingIndicator/></p>
                                <h3>Please Wait・・・・</h3>
                            </div>
                        </Grid>
                    ) : ( 
                        <>
                            <Grid 
                                container 
                                alignItems="center"
                                justifyContent="center"
                            >
                                <div className="App-content">
                                    <p><strong>My Soul</strong></p>
                                    {isLogined ? (
                                        <>
                                            <p>Your DID:{did}</p>
                                            <p>Your IDQToken:{balance}</p>
                                        </>
                                    ) : (
                                        <>
                                            <ActionButton2 buttonName="Sign In / Up" color="primary" clickAction={signInAction} />
                                        </>
                                    )}
                                </div>
                            </Grid>
                        </>
                    )}
                </StyledPaper>
            </Box>
            {successFlg && (
                /* 成功時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="secdesc">Create Trasaction Successfull!!</div>
                </div>
            )}
            {failFlg && (
                /* 失敗時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="desc">Create Trasaction failfull..</div>
                </div>
            )}
        </Grid>
    );
};

export default Home;