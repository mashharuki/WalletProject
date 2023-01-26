import { Certificate } from '@blockcerts/cert-verifier-js';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { MuiFileInput } from 'mui-file-input';
import React, { useState } from "react";
import ActionButton2 from "../common/ActionButton2";
import './../../assets/css/App.css';

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

    /**
     * verifyAction function
     */
    const verifyAction = async() => {
        console.log("file:", file);
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
     * ファイルを選択した時に実行されるメソッド
     * @param {*} newFile verifyするファイル
     */
    const handleChange = (newFile) => {
        console.log("newFile;", newFile)
        setFile(newFile)
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
                                <p><strong>You Verify VC</strong></p>
                                <p className="file-ui">
                                    <MuiFileInput 
                                        className="file-ui"
                                        placeholder="select your file"
                                        value={file} 
                                        onChange={handleChange} 
                                    />
                                </p>
                                <p></p>
                                <ActionButton2 
                                    buttonName="verify" 
                                    color="primary" 
                                    clickAction={verifyAction} 
                                /> 
                        </div>
                    </Grid>
                </StyledPaper>
            </Box>
        </Grid>
    );
};

export default MyVC;