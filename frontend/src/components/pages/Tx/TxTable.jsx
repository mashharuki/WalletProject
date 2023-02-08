// mui関連のコンポーネントのインポート
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ActionButton2 from '../../common/ActionButton2';
import './../../../assets/css/App.css';
import {
    getApprovalCount, getRequired
} from './../../hooks/UseContract';

/**
 * TxTable
 * @param props 引数
 */
const TxTable = (props) => {
    // propsから引数を取得する。
    const { 
        _wallet, 
        _columns, 
        row, 
        index,
        approveAction,
        revokeAction,
        executeAction,
        signer
    } = props;

    // トランザクションのステータス
    const [isExecuted, setIsExecuted] = useState(false);
    // アカウント用のステート変数
    const [approved, setApproved] = useState(0);
    // アカウント用のステート変数
    const [account, setAccount] = useState(null);
    // 閾値用のステート変数
    const [required, setRequired] = useState(0);

    /**
     * 初期化メソッド
     */
    const init = async(_wallet) => {
        console.log("row:", row)
        // トランザクションデータの情報を取得する。
        const executed = row.executed;
        // 承認済みの数を求める
        const approvement = await getApprovalCount(_wallet, index);
        // 閾値を取得する。
        const req = await getRequired(_wallet);

        // ステート変数を更新する。
        setIsExecuted(executed);
        setAccount(signer);
        setApproved(approvement);
        setRequired(req);
    }

    // 副作用フック
    useEffect(() => {
        init(_wallet);
    }, [_wallet]);


    // 副作用フック
    useEffect(() => {
        init(_wallet);
    }, []);

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1}>
                {_columns.map((column) => {
                    // カラムの値により、セットする値を変更する。
                    if(column.label === "No.") {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {index + 1}
                            </TableCell>
                        );
                    }
                    if(column.label === "To") {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {row.to}
                            </TableCell>
                        );
                    }
                    if(column.label === "Value") {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {/* ETHに変換して出力する。 */}
                                {Web3.utils.fromWei(row.value, 'ether')}
                            </TableCell>
                        )
                    } 
                    if(column.label === "Approved") {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {approved} / {required}
                            </TableCell>
                        )
                    } 
                    if(column.label === "Status") {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <p>
                                    <strong>
                                        {isExecuted ? "Executed" : "Not Executed"}    
                                    </strong>
                                </p>
                            </TableCell>
                        )
                    }   
                    if(column.label === "Actions") {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <ActionButton2 buttonName="approve" color="primary" clickAction={approveAction} />
                                <ActionButton2 buttonName="revoke" color="secondary" clickAction={revokeAction} />
                                <ActionButton2 buttonName="execute" color="success" clickAction={executeAction} />
                            </TableCell>
                        )
                    }        
                })}
            </TableRow>
        </>
    );
};

export default TxTable;