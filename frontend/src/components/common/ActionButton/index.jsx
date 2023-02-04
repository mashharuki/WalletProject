import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import React from "react";
import './../../../assets/css/App.css';

/**
 * 共通で利用するActionButtonコンポーネント(下にマージンを作りたい場合)
 */
const ActionButton = (props) => {
    // propsからボタンの色と実行する関数の要素を取り出す。
    const { buttonName, color, clickAction } = props;

    // 描画する内容
    return (
        <Grid sx={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 3}}>
            <Button color={color} variant="outlined" sx={{borderRadius: 4}} onClick={clickAction}>
                {buttonName}
            </Button>
        </Grid>
    );
};

export default ActionButton;
