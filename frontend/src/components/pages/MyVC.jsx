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
    const [file, setFile] = useState(null);

    /**
     * verifyAction function
     */
    const verifyAction = (e) => {

    };

    /**
     * ファイルを選択した時に実行されるメソッド
     * @param {*} newFile verifyするファイル
     */
    const handleChange = (newFile) => {
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
                                <ActionButton2 buttonName="verify" color="primary" clickAction={e => verifyAction(e)} /> 
                        </div>
                    </Grid>
                </StyledPaper>
            </Box>
        </Grid>
    );
};

export default MyVC;