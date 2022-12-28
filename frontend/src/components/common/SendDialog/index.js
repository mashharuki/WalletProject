import {
      Dialog, DialogActions,
      DialogContent,
      DialogContentText, DialogTitle, FormControl,
      Input
} from '@mui/material';
import React from 'react';
import ActionButton from "./../ActionButton";
import './SendDialog.css';

/**
 * SendDialogコンポーネント
 * @param props 引数
 */
const SendDialog = (props) => {
    // 引数から値を取得する。
    const { open, to, amount, handleClose, sendAction, setTo,setAmountAction} = props;

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Send IDQ Token
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
                    <ActionButton buttonName="send" clickAction={sendAction} color="primary"/>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SendDialog;