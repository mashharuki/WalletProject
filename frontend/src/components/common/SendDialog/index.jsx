import {
    Dialog, DialogActions,
    DialogContent,
    DialogContentText, DialogTitle, FormControl,
    Input
} from '@mui/material';
import Grid from "@mui/material/Grid";
import React, { useState } from 'react';
import ActionButton from "./../ActionButton";
import './SendDialog.css';


/**
 * SendDialogコンポーネント
 * @param props 引数
 */
const SendDialog = (props) => {
    const [readFlg, setReadFlg] = useState(false);
    // 引数から値を取得する。
    const { 
        open, 
        to, 
        amount, 
        handleClose, 
        sendAction, 
        setTo,
        setAmountAction,
        clickOpenQrReader
    } = props;

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Send Token
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>
                            Plaese enter addr & amount 
                        </p>
                        <FormControl className="formControl">
                              <Input 
                                id="component-simple" 
                                value={to} 
                                onChange={setTo} 
                                placeholder="did:ion..." 
                            />
                            <br/>
                            <Input 
                                id="component-simple2" 
                                value={amount} 
                                onChange={setAmountAction} 
                                placeholder="0.00" 
                            />
                        </FormControl>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        flex={true}
                    >
                        <ActionButton buttonName="send" color="primary" clickAction={sendAction}/>
                        <ActionButton buttonName="Scan" color="secondary" clickAction={clickOpenQrReader} />
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SendDialog;