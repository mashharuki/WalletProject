import { Certificate } from '@blockcerts/cert-verifier-js';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from 'axios';
import FormData from 'form-data';
import React, { useState } from "react";
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import './../../assets/css/App.css';
import {
    PINTABaseURL,
    PINTAGatewayURL
} from './../common/Constant';

const {
    PINATA_API_JWT
} = process.env;

/** 
 * StyledPaperコンポーネント
 */
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 400,
    minHeight: 200,
    backgroundColor: 'rgb(150, 144, 144)'
}));

/**
 * MyVC Component
 */
const MyVC = () => {
    const [file, setFile] = useState({});
    const [fileName, setFileName] = useState('blockcert json file');
    const [pendingFlg, setPendingFlg] = useState(false);

    /**
     * verifyAction function
     */
    const verifyAction = async() => {
        // sample VC URL
        const sampleVCURL = `${PINTAGatewayURL}/QmfXtyA91pvfiuiuDfCruNE9KerhwZEp4JTv18QNh2Ptpj`;

        // get Sample VC data;
        // POSTメソッドでデータを送信する
        const res = await axios.get(
            // APIのURL
            sampleVCURL,
            // ヘッダー情報
            {
                headers: {
                    'Authorization': `${PINATA_API_JWT}`,
                    'Content-Type': `application/json`,
                },
            }
        );

        console.log("file:", res);
        // get file data
        let certificate = new Certificate(file);
        await certificate.init();
        
        // verify VC data
        const verificationResult = await certificate.verify(({code, label, status, errorMessage}) => {
          console.log('Code:', code, label, ' - Status:', status);
          if (errorMessage) {
            console.log(`The step ${code} fails with the error: ${errorMessage}`);
          }
        });
      
        if (verificationResult.status === 'failure') {
          console.log(`The certificate is not valid. Error: ${verificationResult.errorMessage}`);
        }
    };

    /**
     * ファイルをIPFSにアップロードしてCIDをコントラクトと紐付けるメソッド
     * @param {*} e eventオブジェクト
     */
    const handleChange = async (e) => {
        // FormDataオブジェクトを生成
        let postData = new FormData();
        // APIを使って送信するリクエストパラメータを作成する。
        postData.append('file', e.target.files[0]);
        postData.append('pinataOptions', '{"cidVersion": 1}');
        postData.append('pinataMetadata', `{"name": "${fileName}", "keyvalues": {"company": "vc"}}`);
       
        try {
            // フラグ ON
            setPendingFlg(true);
            // POSTメソッドでデータを送信する
            const res = await axios.post(
                // APIのURL
                PINTABaseURL + '/pinning/pinJSONToIPFS',
                // リクエストパラメータ
                postData ,
                // ヘッダー情報
                {
                    headers: {
                        'Authorization': `${PINATA_API_JWT}`,
                        'Content-Type': `application/json`,
                    },
                }
            );

            console.log(res);
            // CIDを取得
            console.log("CID:", res.data.IpfsHash);
            // フラグ OFF
            setPendingFlg(false);
            // CIDを出力
            alert(`upload Successfull!! CID:${res.data.IpfsHash}`);
        } catch (e) {
            // フラグ OFF
            setPendingFlg(false);
            console.error("upload failfull.....：", e);
            alert("upload failfull.....");
        }
    }
    

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
                    <Grid 
                        container 
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div className="App-content">
                            {pendingFlg ? (
                                    <Grid container justifyContent="center">
                                          <div className="loading">
                                                <p><LoadingIndicator/></p>
                                                <h3>Please Wait・・・・</h3>
                                          </div>
                                    </Grid>
                            ) : (
                                <>
                                    <p><strong>You can verify VC</strong></p>
                                    <p></p>
                                    <blockcerts-verifier></blockcerts-verifier>
                                </> 
                            )}
                        </div>
                    </Grid>
                </StyledPaper>
            </Box>
        </Grid>
    );
};

export default MyVC;