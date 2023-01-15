import { TextField } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import superAgent from 'superagent';
import ActionButton2 from '../common/ActionButton2';
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import PaymentDialog from '../common/PaymentDialog';
import './../../assets/css/App.css';

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
 * Buyコンポーネント
 */
const Buy = (props) => {
      // 引数からデータを取得する。
      const {
            signer,
            baseURL
      } = props;

      const [isLoading, setIsLoading] = useState(false);
      const [successFlg, setSuccessFlg] = useState(false);
      const [failFlg, setFailFlg] = useState(false);
      const [showToast, setShowToast] = useState(false);
      const [amount, setAmount] = useState(0);
      const [open, setOpen] = useState(false);

      /**
       * Buy function 
       */
      const buyAction = async() => {
            setIsLoading(true);

            // IDQToken発行APIを呼び出す
            superAgent
                  .post(baseURL + '/api/mintIDQ')
                  .query({
                        to: signer,
                        amount: amount
                  })
                  .end(async(err, res) => {
                        if (err) {
                              console.log("IDQToken発行用API呼び出し中に失敗", err);
                              // popUpメソッドの呼び出し
                              popUp(false, "failfull...");
                              setIsLoading(false);
                              return err;
                        }
                        // popUpメソッドの呼び出し
                        popUp(true, "successfull!!");
                        setIsLoading(false);   
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

      return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                  { /* Payment Dialog */ } 
                  <PaymentDialog 
                        open={open} 
                        handleClose={(e) => {handleClose()}} 
                        buyAction={(e) => {buyAction()}}
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
                                                      <p><strong>You can buy IDQ Token</strong></p>
                                                      <p></p>
                                                      <TextField 
                                                            id="amount" 
                                                            placeholder="enter amount" 
                                                            margin="normal" 
                                                            required
                                                            onChange={ (e) => setAmount(e.target.value) } 
                                                            variant="outlined" 
                                                            inputProps={{ 'aria-label': 'amount' }} 
                                                      />
                                                      <ActionButton2 buttonName="buy" color="primary" clickAction={handleOpen} /> 
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

export default Buy;