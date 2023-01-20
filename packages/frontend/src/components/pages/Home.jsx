// mui関連のコンポーネントのインポート
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import superAgent from 'superagent';
import ActionButton2 from '../common/ActionButton2';
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import SendDialog from '../common/SendDialog';
import './../../assets/css/App.css';
import Coupon from './../../assets/imgs/Coupon_2.png';
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
        baseURL
    } = props;

    const [balance, setBalance] = useState(0);
    const [did, setDid] = useState(null);
    const [fullDid, setFullDid] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [successFlg, setSuccessFlg] = useState(false);
    const [failFlg, setFailFlg] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [to, setTo] = useState(null);
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);

    /**
     * Register function 
     */
    const registerAction = async() => {
        // Factory object
        const FactoryContract = new provider.eth.Contract(WalletFactory.abi, CONTRACT_ADDRESS);
        
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
                    //setIsLogined(false);
                    setIsLoading(false);
                    return err;
                }

                // DIDを取得する。
                const result = await FactoryContract.methods.dids(signer).call();
                var modStr = result.substr(0, 9) + '...' + result.substr(result.length - 3, 3);

                setDid(modStr);
                setFullDid(result);
                console.log("DID作成用API呼び出し結果：", result);  

                // IDQToken発行APIを呼び出す
                superAgent
                    .post(baseURL + '/api/mintIDQ')
                    .query({
                        to: signer,
                        amount: 10000
                    })
                    .end(async(err, res) => {
                        if (err) {
                            console.log("IDQToken発行用API呼び出し中に失敗", err);
                            // popUpメソッドの呼び出し
                            popUp(false, "failfull...");
                            setIsLoading(false);
                            return err;
                        }
                    });

                // popUpメソッドの呼び出し
                popUp(true, "successfull!!");
                await checkStatus();
                setIsLoading(false);   
            });
    }

    /**
     * send function
     */
    const sendAction = async(to, amount) => {
        setIsLoading(true);
        
        // 送金用のAPIを呼び出す
        superAgent
            .post(baseURL + '/api/send')
            .query({
                from: fullDid,
                to: to,
                amount: amount
            })
            .end(async(err, res) => {
                if (err) {
                    console.log("IDQToken送金用API呼び出し中に失敗", err);
                    // popUpメソッドの呼び出し
                    popUp(false, "failfull...");
                    setIsLoading(false);
                    return err;
                }
                await getBalance();
                setIsLoading(false);
                // popUpメソッドの呼び出し
                popUp(true, "successfull!!");
            });
    };

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

    /**
     * Open Dialog
     * @param wallet MultoSig Wallet Addr
     */
    const handleOpen = (wallet) => {
        setOpen(true);
    }

    /**
     * Close Dialog
     */
    const handleClose = () => {
        setOpen(false);
    }

    /**
     * クリップボードでDIDをコピーするための機能
     */
    const copy = () => {
        //コピー
        navigator.clipboard.writeText(fullDid)
            .then(function() {
                console.log('Async: Copyed to clipboard was successful!');
                alert("Copying to clipboard was successful!")
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
    };

    /**
     * getBalance function
     */
    const getBalance = async() => {
        // コントラクト用のインスタンスを生成する。
        const instance = new provider.eth.Contract(MyToken.abi, MYTOKEN_ADDRESS);
        // 残高を取得する
        const num = await instance.methods.balanceOf(signer).call();
        setBalance(num);
    }

    /**
     * checkStatus function
     */
    const checkStatus = async() => {
        // Factory object
        const FactoryContract = new provider.eth.Contract(WalletFactory.abi, CONTRACT_ADDRESS);
        // 登録ステータスを確認する。
        var status = await FactoryContract.methods.isRegistered(signer).call();
        console.log("isRegistered:", isRegistered);
        setIsRegistered(status);

        if(status) {
            // DIDを取得する。
            const didData = await FactoryContract.methods.dids(signer).call();
            console.log("didData :", didData);
            // short
            var modStr = didData.substr(0, 9) + '...' + didData.substr(didData.length - 3, 3)
            setDid(modStr);
            setFullDid(didData);
        }
    };

    useEffect(()=> {
        getBalance();
        checkStatus();
    }, []);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            { /* Dialog */ } 
            <SendDialog 
                open={open} 
                amount={amount}
                to={to}
                handleClose={(e) => {handleClose()}} 
                sendAction={(e) => {sendAction(to, amount)}} 
                setTo={(e) => {setTo(e.target.value)}}
                setAmountAction={(e) => {setAmount(e.target.value)}} 
            />
            { /* main content */ } 
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
                                    {isRegistered ? (
                                        <>
                                            <p>Your DID:{did} <ContentCopyIcon className='pointer' fontSize="small" onClick={copy}/></p>
                                            <p>Your IDQToken:{balance}</p>
                                            <ActionButton2 buttonName="send" color="primary" clickAction={handleOpen} />
                                        </>
                                    ) : (
                                        <>
                                            <ActionButton2 buttonName="Register" color="primary" clickAction={registerAction} />
                                        </>
                                    )}
                                </div>
                            </Grid>
                        </>
                    )}
                </StyledPaper>
                {isRegistered ? (
                    <Grid 
                        container 
                        justifyContent="center"
                    >
                        <img className="image_size_m" src={Coupon} /> 
                    </Grid>
                ) : <></>}
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