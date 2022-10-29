import { TextField } from '@mui/material';
// mui関連のコンポーネントのインポート
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import walletContract from "../../contracts/MultiSigWallet.json";
import ActionButton from '../common/ActionButton';
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import './../../assets/css/App.css';
import TxTable from './TxTable';

/**
 * 表の最上位ヘッダー部の配列
 */
const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'to', label: 'To', minWidth: 200, align: 'center' },
    { id: 'value', label: 'Value', minWidth: 150, align: 'center'},
    { id: 'approved', label: 'Approved', minWidth: 150, align: 'center'},
    { id: 'status', label: 'Status', minWidth: 150, align: 'center'},
    { id: 'actions', label: 'Actions', minWidth: 200, align: 'center'},
];

/** 
 * StyledPaperコンポーネント
 */
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 1400,
    backgroundColor: 'rgb(150, 144, 144)'
}));

/**
 * Txsコンポーネント
 */
const Txs = (props) => {

    const { 
        provider,
        blocto,
        signer
    } = props;

    // コントラクト用のステート変数
    const [contract, setContract] = useState(null); 
    // アカウント用のステート変数
    const [account, setAccount] = useState(null);
    // 作成済みのウォレットコントラクトを格納する配列
    const [wallet, setWallet] = useState (null);
    // トランザクションのデータを格納する配列
    const [txs, setTxs] = useState ([]);
    // 送金先アドレスを格納するためのステート変数
    const [to, setTo] = useState(null);
    // 送金額を格納するためのステート変数
    const [value, setValue] = useState(0);
    // インプットデータ用のステート変数
    const [inputData, setInputData] = useState('0x');
    // トランザクションが正常に処理された場合のフラグ
    const [successFlg, setSuccessFlg] = useState(false);
    // トランザクションが異常終了した場合のフラグ
    const [failFlg, setFailFlg] = useState(false);
    // ポップアップの表示を管理するフラグ
    const [showToast, setShowToast] = useState(false);
    // ポップアップ時に表示する文言を格納する変数
    const [popUpDocs, setPopUpDocs] = useState("");
    // ローディングを表示するためのフラグ
    const [isLoading, setIsLoading] = useState(false);
    // createモードかどうかを切り替えるためのフラグ
    const [createFlg, setCreateFlg] = useState(false);
    // ページ番号用のステート変数
    const [page, setPage] = useState(0);
    // 1ページに表示する上限数
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // locationを使うための変数
    const location = useLocation();

    /**
     * コンポーネントが描画されたタイミングで実行する初期化関数
     */
    const init = async() => {
        // locationから取得する。
        const addr = location.state.addr;
        console.log("web3provider:", provider)

        try { 
            const instance = new provider.eth.Contract(walletContract.abi, addr);
            // トランザクションの情報を取得する。
            const transactions = await instance.methods.getTxs().call();
            // コントラクトとアカウントの情報をステート変数に格納する。
            setContract(instance);
            setAccount(signer);
            setWallet(addr);
            setTxs(transactions);
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
            console.error(error);
        }
    };

    /**
     * send Tx function
     * @param data byte data
     * @return yxHash Transaction Hash
     */
    const sendTx = async(data) => {
        // トランザクションを作成する
        const param = [{
            from: account,
            to: wallet,
            gas: '0x76c0', // 30400
            gasPrice: '0x9184e72a000', // 10000000000000
            value: value, 
            data: data,
        },];
        // 送信する
        const txHash = await blocto.ethereum.request({
            method: 'eth_sendTransaction', 
            params: param,
        });
        
        return txHash;
    }  

    /**
     * 「Create」ボタンを押した時の処理
     */
    const createAction = async() => {
        // 送金額をETHに変換する。
        const sendValue = Web3.utils.toWei(value);

        try {
            setIsLoading(true);
            // submitメソッドをエンコードする。
            var data = contract.methods.submit(to, sendValue, inputData).encodeABI();
            // sendTx
            await sendTx(data);

            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(true, "Transaction successfull!!");
        } catch(err) {
            console.error("err:", err);
            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(false, "Transaction failfull...");
        }
    }

    /**
     * 「Approve」ボタンを押した時の処理
     * @param txId トランザクションID
     */
    const approveAction = async(txId) => {
        try {
            setIsLoading(true);
            
            // submitメソッドをエンコードする。
            var data = contract.methods.approve(txId).encodeABI();
            // sendTx
            await sendTx(data);

            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(true, "Transaction successfull!!");
        } catch(err) {
            console.error("err:", err);
            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(false, "Transaction failfull...");
        }
    }

    /**
     * 「Revoke」ボタンを押した時の処理
     * @param txId トランザクションID
     */
    const revokeAction = async(txId) => {
        try {
            setIsLoading(true);
            
            // revokeメソッドをエンコードする。
            var data = contract.methods.revoke(txId).encodeABI();
            // sendTx
            await sendTx(data);
            
            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(true, "Transaction successfull!!");
        } catch(err) {
            console.error("err:", err);
            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(false, "Transaction failfull...");
        }
    }

    /**
     * 「Execute」ボタンを押した時の処理
     * @param txId トランザクションID
     */
    const executeAction = async(txId) => {
        try {
            setIsLoading(true);
            
            // exexuteメソッドをエンコードする。
            var data = contract.methods.execute(txId).encodeABI();
            // sendTx
            await sendTx(data);

            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(true, "Transaction successfull!!");
        } catch(err) {
            console.error("err:", err);
            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(false, "Transaction failfull...");
        }
    }

    /**
     * ポップアップ時の処理を担当するメソッド
     * @param flg true：成功 false：失敗
     * @param docs ポップアップに出力する文言
     */
    const popUp = (flg, docs) => {
        // 成功時と失敗時で処理を分岐する。
        if(flg === true) {
            // ステート変数を更新する。
            setSuccessFlg(true);
            setShowToast(true);
            setPopUpDocs(docs);
            // 5秒後に非表示にする。
            setTimeout(() => {
                setSuccessFlg(false);
                setShowToast(false);
                setPopUpDocs("");
            }, 5000);
        } else {
            // ステート変数を更新する。
            setFailFlg(true);
            setShowToast(true);
            setPopUpDocs(docs);
            // 5秒後に非表示にする。
            setTimeout(() => {
                setFailFlg(false);
                setShowToast(false);
                setPopUpDocs("");
            }, 5000);
        }
    };

    /**
     * ページングするための関数
     * @param e イベント内容
     * @param newPage 新しいページ
     */
     const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };
        
    /**
     * 1ページに表示する取引履歴の上限を引き上げる関数
     * @param e イベント内容
     */
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    };

    // 副作用フック
    useEffect(() => {
        setIsLoading(true);
        init();
        setIsLoading(false);
    }, [wallet]);

    return(
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3, mt: 10, height: '80vh'}}>
                <StyledPaper sx={{my: 1, mx: "auto", p: 0, borderRadius: 4, marginTop: 4}}>
                    {isLoading ? (
                        <Grid container justifyContent="center">
                            <header className="loading">
                                <p><LoadingIndicator/></p>
                                <h3>Please Wait・・・・</h3>
                            </header>
                        </Grid>
                    ) : ( 
                        <>
                            {/* Createモードかどうかで表示を切り替える。 */}
                            {createFlg ? (
                                <>
                                    <Grid container justifyContent="center">
                                        <Grid 
                                            container
                                            justifyContent="center"
                                            sx={{ 
                                                alignItems: 'center', 
                                                m: 1,
                                            }}
                                        >
                                            <p><strong>Please etner Transaction info</strong></p>
                                        </Grid>
                                        <Grid 
                                            container 
                                            justifyContent="center"
                                            sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                m: 1,
                                                marginTop: 4
                                            }}
                                        >
                                            <Paper
                                                elevation={0}
                                                sx={{ 
                                                    p: '2px 4px', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    backgroundColor: 'rgb(150, 144, 144)',
                                                    width: 450, 
                                                    marginTop: 1
                                                }}
                                            >  
                                                <label>to ：</label>
                                                <TextField 
                                                    id="to" 
                                                    placeholder="send address" 
                                                    margin="normal" 
                                                    required
                                                    onChange={ (e) => setTo(e.target.value) } 
                                                    variant="outlined" 
                                                    inputProps={{ 'aria-label': 'to' }} 
                                                />
                                            </Paper>
                                        </Grid>
                                        <Grid 
                                            container 
                                            justifyContent="center"
                                            sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                m: 1,
                                                marginTop: 4
                                            }}
                                        >
                                            <Paper
                                                elevation={0}
                                                sx={{ 
                                                    p: '2px 4px', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    backgroundColor: 'rgb(150, 144, 144)',
                                                    width: 450, 
                                                    marginTop: 1
                                                }}
                                            >  
                                                <label>value ：</label>
                                                <TextField 
                                                    id="value" 
                                                    placeholder="value" 
                                                    margin="normal" 
                                                    type="number"
                                                    required
                                                    onChange={ (e) => setValue(e.target.value) } 
                                                    variant="outlined" 
                                                    inputProps={{ 'aria-label': 'value' }} 
                                                />
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                    <Grid 
                                        container 
                                        justifyContent="center"
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            m: 1,
                                            marginTop: 4
                                        }}
                                    >
                                        <ActionButton buttonName="Create" color="error" clickAction={createAction} />
                                        <ActionButton buttonName="back" color="primary" clickAction={(e) => {setCreateFlg(false)}} />
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid container justifyContent="center">
                                        <Grid 
                                            container
                                            justifyContent="center"
                                            sx={{ 
                                                alignItems: 'center', 
                                                m: 1,
                                            }}
                                        >
                                            <p><strong>Transaction Info</strong></p>
                                        </Grid>
                                    </Grid>
                                    <TableContainer sx={{ maxHeight: 600 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {txs
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row, i) => {
                                                        /* WalletTableコンポーネントに値を詰めて描画する。 */
                                                        return (
                                                            <TxTable 
                                                                _wallet={wallet} 
                                                                _columns={columns} 
                                                                row={row} 
                                                                index={i} 
                                                                approveAction={(e) => approveAction(i)}
                                                                revokeAction={(e) => revokeAction(i)}
                                                                executeAction={(e) => executeAction(i)}
                                                            />
                                                        );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={txs.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        signer={account}
                                        provider={provider}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                    <Grid 
                                        container 
                                        justifyContent="center"
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            m: 1,
                                            marginTop: 4
                                        }}
                                    >
                                        <ActionButton buttonName="Create Transaction" color="error" clickAction={(e) => {setCreateFlg(true)}} />
                                    </Grid>
                                </>
                            ) }
                        </>
                    )}
                </StyledPaper>
            </Box>
            {successFlg && (
                /* 成功時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="secdesc">{popUpDocs}</div>
                </div>
            )}
            {failFlg && (
                /* 失敗時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="desc">{popUpDocs}</div>
                </div>
            )}
        </Grid>
    );
}

export default Txs;