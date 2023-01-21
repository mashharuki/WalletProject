import Grid from "@mui/material/Grid";
import React from "react";
import './../../assets/css/App.css';

/**
 * MyVC Component
 */
const MyVC = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
                <div className="App-header">
                    <p>My VC</p>
                </div>
        </Grid>
    );
};

export default MyVC;