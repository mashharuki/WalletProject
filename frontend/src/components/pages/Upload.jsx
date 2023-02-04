import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from 'axios';
import FormData from 'form-data';
import { MuiFileInput } from 'mui-file-input';
import React, { useState } from "react";
import ActionButton2 from '../common/ActionButton2';
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import './../../assets/css/App.css';
import {
      PINTABaseURL
} from './../common/Constant';

const {
    REACT_APP_PINATA_API_KEY,
    REACT_APP_PINATA_API_SECRET
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
 * Upload Component
 */
const Upload = () => {
      const [file, setFile] = useState({});
      const [fileName, setFileName] = useState('blockcert json file');
      const [pendingFlg, setPendingFlg] = useState(false);
      const [successFlg, setSuccessFlg] = useState(false);
      const [failFlg, setFailFlg] = useState(false);
      const [showToast, setShowToast] = useState(false);

      /**
       * ファイルをIPFSにアップロードしてCIDをコントラクトと紐付けるメソッド
       * @param {*} e eventオブジェクト
       */
      const upload = async () => {
            // FormDataオブジェクトを生成
            let postData = new FormData();
            // APIを使って送信するリクエストパラメータを作成する。
            postData.append('file', file);
            postData.append('pinataOptions', '{"cidVersion": 1}');
            postData.append('pinataMetadata', `{"name": "${fileName}", "keyvalues": {"company": "vc"}}`);
            
            try {
                  // フラグ ON
                  setPendingFlg(true);
                  // POSTメソッドでデータを送信する
                  const res = await axios.post(
                        // APIのURL
                        PINTABaseURL + '/pinning/pinFileToIPFS',
                        // リクエストパラメータ
                        postData,
                        // ヘッダー情報
                        {
                              headers: {
                                    'Content-Type': `multipart/form-data; boundary=${postData._boundary}`,
                                    'pinata_api_key': `${REACT_APP_PINATA_API_KEY}`,
                                    'pinata_secret_api_key': `${REACT_APP_PINATA_API_SECRET}`,
                              },
                        }
                  );

                  console.log(res);
                  // CIDを取得
                  console.log("CID:", res.data.IpfsHash);
                  // フラグ OFF
                  setPendingFlg(false);
                  // CIDを出力
                  popUp(true);
                  alert(`upload Successfull!! CID:${res.data.IpfsHash}`);
            } catch (e) {
                  // フラグ OFF
                  setPendingFlg(false);
                  console.error("upload failfull.....：", e);
                  popUp(false);
                  alert("upload failfull.....");
            }
      };

      /**
       * Fileオブジェクトを登録する関数
       * @param {*} newFile 
       */
      const handleChangeFile = (newFile) => {
            setFile(newFile);
            setFileName(newFile.name)
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
                                                      <p><strong>You can upload your VC</strong></p>
                                                      <p></p>
                                                      <div className="file-ui">
                                                            <MuiFileInput 
                                                                  value={file} 
                                                                  placeholder="Please select your file"
                                                                  onChange={handleChangeFile} 
                                                                  variant="outlined" 
                                                            />
                                                      </div>
                                                      <ActionButton2 
                                                            buttonName="upload" 
                                                            color="primary" 
                                                            clickAction={upload} 
                                                      /> 
                                                </> 
                                          )}
                                    </div>
                              </Grid>
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

export default Upload;