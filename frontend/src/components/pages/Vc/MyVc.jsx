import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import './../../../assets/css/App.css';
import {
    getDid,
    getVcs
} from './../../hooks/UseContract';

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
const MyVC = (props) => {

    // 引数からデータを取得する。
    const {
        signer
    } = props;

    useEffect(() => {
        const init = async()=> {
            // get did
            var did = await getDid(signer);
            var vcs = await getVcs(did);
            console.log("vcs:", vcs);
        }

        init();
    });

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
                            <p><strong>You can verify VC</strong></p>
                            <p></p>
                            <blockcerts-verifier></blockcerts-verifier>
                            <p></p>
                        </div>
                    </Grid>
                </StyledPaper>
            </Box>
        </Grid>
    );
};

export default MyVC;