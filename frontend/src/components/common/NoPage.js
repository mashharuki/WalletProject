import './../../assets/css/App.css';
import React from "react";
import Grid from "@mui/material/Grid";

/**
 * NoPageコンポーネント
 * (404用)
 */
const NoPage = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
                <div className="App-header">
                    <p>Not found!!</p>
                </div>
        </Grid>
    );
};

export default NoPage;