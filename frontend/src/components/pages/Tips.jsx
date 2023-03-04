import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import superAgent from 'superagent';
import ActionButton2 from '../common/ActionButton2';
import LoadingIndicator from '../common/LoadingIndicator';
import MainContainer from "../common/MainContainer";
import './../../assets/css/App.css';
import { baseURL } from "./../common/Constant";

// サンプル用のデモデータ
const demoDatas = [
      {
            title: "コーラ代",
            description: "〇〇さんへコーラ代を送ります。",
            to: "did:ion:EiAhOtns7CytGudHJsyZ6WqTaCqmLRXsk8mW26ZOaEF7AA",
            value: 90
      },
      {
            title: "コーヒー代",
            description: "〇〇さんへコーヒー代を送ります。",
            to: "did:ion:EiAhOtns7CytGudHJsyZ6WqTaCqmLRXsk8mW26ZOaEF7AA",
            value: 100
      },
      {
            title: "Thank you",
            description: "〇〇さんへお礼として送ります。",
            to: "did:ion:EiAhOtns7CytGudHJsyZ6WqTaCqmLRXsk8mW26ZOaEF7AA",
            value: 39
      },
];

/**
 * Tipsコンポーネント
 */
const Tips = () => {
      const [isLoading, setIsLoading] = useState(false);
      const [successFlg, setSuccessFlg] = useState(false);
      const [failFlg, setFailFlg] = useState(false);
      const [showToast, setShowToast] = useState(false);

      /**
       * sendAction
       * @param to
       * @param amount
       */
      const sendAction = async(to, amount) => {
            setIsLoading(true);

            // IDQToken発行APIを呼び出す
            superAgent
                  .post(baseURL + '/api/mintIDQ')
                  .query({
                        to: to,
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

      return (
            <MainContainer>
                  {isLoading ? (
                        <Grid container justifyContent="center">
                              <div className="loading">
                                    <p><LoadingIndicator/></p>
                                    <h3>Please Wait・・・・</h3>
                              </div>
                        </Grid>
                  ) : ( 
                        <Grid container spacing={{ xs: 1, md: 3  }} columns={{ xs: 4, sm: 8, md: 12 }}>
                              {demoDatas.map((demoData) => (
                                    <Card sx={{ minWidth: 350, minHeight: 300, m: 3, background: 'lemonchiffon' }}>
                                          <CardContent sx={{ mt: 5 }}>
                                                <Typography variant="h5" component="div" gutterBottom>
                                                      {demoData.title}
                                                </Typography>
                                                <Typography variant="body2">
                                                      {demoData.description}
                                                </Typography>
                                          </CardContent>
                                          <CardActions>
                                                <ActionButton2 buttonName="send" color="primary" clickAction={() => sendAction(demoData.to, demoData.value)} />
                                          </CardActions>
                                    </Card>
                              ))}
                        </Grid>
                  )}
            </MainContainer>
      );
};

export default Tips;