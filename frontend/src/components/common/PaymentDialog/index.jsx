import {
      Dialog, DialogActions,
      DialogContent,
      DialogContentText, DialogTitle
} from '@mui/material';
import React from 'react';
import PaymentElement from '../PaymentElement';
import ActionButton from "./../ActionButton";
import './PaymentDialog.CSS';

/**
 * PaymentDialogコンポーネント
 * @param props 引数
 */
const PaymentDialog = (props) => {
      // 引数から値を取得する。
      const { 
            open, 
            handleClose, 
            buyAction
      } = props;

      return (
            <>
                  <Dialog 
                        open={open} 
                        onClose={handleClose} 
                        aria-labelledby="form-dialog-title"
                  >
                        <DialogTitle id="form-dialog-title">
                              Payment Page
                        </DialogTitle>
                        <DialogContent>
                              <DialogContentText>
                                    <PaymentElement/>
                              </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                              <ActionButton buttonName="Pay" clickAction={buyAction} color="primary"/>
                        </DialogActions>
                  </Dialog>
            </>
      );
};

export default PaymentDialog;