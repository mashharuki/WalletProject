import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React from "react";
import './../../assets/css/App.css';
import MainContainer from './../common/MainContainer';

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
 * Verify Component
 */
const Verify = () => {
    return (
        <MainContainer>
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
        </MainContainer>
    );
};

export default Verify;