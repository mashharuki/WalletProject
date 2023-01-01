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
import superAgent from 'superagent';
import Web3 from "web3";
import FactoryContract from "../../../contracts/WalletFactoryV4.json";
import WalletDialog from '../../common/Dialog';
import LoadingIndicator from '../../common/LoadingIndicator/LoadingIndicator';
import './../../../assets/css/App.css';
import WalletTable from './WalletTable';

/**
 * 表の最上位ヘッダー部の配列
 */
const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'address', label: 'Address', minWidth: 200, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 150, align: 'center'},
    { id: 'owners', label: 'Owners', minWidth: 150, align: 'center'},
    { id: 'required', label: 'Required', minWidth: 150, align: 'center'},
    { id: 'deposit', label: 'Deposit', minWidth: 150, align: 'center'},
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
 * Walletsコンポーネント
 */
const Wallets = (props) => {
    // 引数からデータを取得する。
    const {
        CONTRACT_ADDRESS,
        provider,
        blocto,
        signer,
        baseURL 
    } = props;

    // コントラクト用のステート変数
    const [contract, setContract] = useState(null); 
    // アカウント用のステート変数
    const [account, setAccount] = useState(null);
    // 作成済みのウォレットコントラクトを格納する配列
    const [wallets, setWallets] = useState([]);
    // 作成済みのウォレットが0であることのフラグ
    const [isZero, setIsZero] = useState(false);
    // ページ番号用のステート変数
    const [page, setPage] = useState(0);
    // 1ページに表示する上限数
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // ローディングを表示するためのフラグ
    const [isLoading, setIsLoading] = useState(false);
    // トランザクションが正常に処理された場合のフラグ
    const [successFlg, setSuccessFlg] = useState(false);
    // トランザクションが異常終了した場合のフラグ
    const [failFlg, setFailFlg] = useState(false);
    // ポップアップの表示を管理するフラグ
    const [showToast, setShowToast] = useState(false);
    // Dialogの表示を切り替えるフラグ
    const [open, setOpen] = useState(false);
    // deposit address
    const [depositAddr, setDepositAddr] = useState(null);
    // depozit amount
    const [amount, setAmount] = useState(0);

    /**
     * コンポーネントが描画されたタイミングで実行する初期化関数
     */
    const init = async() => {
        try {
            // コントラクト用のインスタンスを生成する。
            const instance = new provider.eth.Contract(FactoryContract.abi, CONTRACT_ADDRESS);
            var multiSigWallets;

            // 作成済みウォレットアドレスを取得する。
            const count = await instance.methods.walletsCount().call();
            // ウォレットの数がゼロだった時はゼロフラグをオンにする。
            if (count === 0) {
                setIsZero(true);
            } else {
                multiSigWallets = await instance.methods.getWallets(10, 0).call();
            }
            
            // コントラクトとアカウントの情報をステート変数に格納する。
            setContract(instance);
            setAccount(signer);
            setWallets(multiSigWallets);
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
            console.error(error);
        }
    };

    /**
     * 入金用のメソッド
     * @param wallet ウォレットアドレス
     */
    const depositAction = async (wallet) => {

        try {
            setOpen(false);
            setIsLoading(true);
            // 入金額を16進数に変換する。
            const value = Web3.utils.toWei(amount.toString());
            
            // 償却用APIを呼び出す
            await superAgent
                .post(baseURL + '/api/burnIDQ')
                .query({
                    to: signer,
                    amount: value,
                    walletAddr: depositAddr
                })
                .end(async(err, res) => {
                    if (err) {
                        console.log("償却用API呼び出し中に失敗", err);
                        // popUpメソッドの呼び出し
                        popUp(false, "failfull...");
                        setIsLoading(false);
                        return err;
                    }
                });

            setDepositAddr("");
            setAmount(0);
            setIsLoading(false);
            // popUpメソッドを呼び出す
            popUp(true);
        } catch(err) {
            console.error("err:", err);

            setDepositAddr("");
            setAmount(0);
            setOpen(false);
            setIsLoading(false);
            // popUpメソッドを呼び出す
            popUp(false);
        }
    }

    /**
     * Open Dialog
     * @param wallet MultoSig Wallet Addr
     */
     const handleOpen = (wallet) => {
        setDepositAddr(wallet);
        setOpen(true);
    }

    /**
     * Close Dialog
     */
     const handleClose = () => {
        setDepositAddr("");
        setOpen(false);
    }

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

    /**
     * ポップアップ時の処理を担当するメソッド
     * @param flg true：成功 false：失敗
     */
    const popUp = (flg) => {
        // 成功時と失敗時で処理を分岐する。
        if(flg === true) {
            // ステート変数を更新する。
            setSuccessFlg(true);
            setShowToast(true);       
            // 5秒後に非表示にする。
            setTimeout(() => {
                setSuccessFlg(false);
                setShowToast(false);             
            }, 5000);
        } else {
            // ステート変数を更新する。
            setFailFlg(true);
            setShowToast(true);     
            // 5秒後に非表示にする。
            setTimeout(() => {
                setFailFlg(false);
                setShowToast(false);
            }, 5000);
        }
    };

    // 副作用フック
    useEffect(() => {
        setIsLoading(true);
        init();
        setIsLoading(false);
    }, [account]);

    return(
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            { /* Dialog */ } 
            <WalletDialog 
                open={open} 
                amount={amount}
                handleClose={(e) => {handleClose()}} 
                depositAction={(e) => {depositAction(depositAddr)}} 
                setAmountAction={(e) => {setAmount(e.target.value)}} 
            />
            { /* main content */ }
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
                            {isZero ? (
                                <Grid container justifyContent="center">
                                    <h3>No Wallets!!</h3>
                                </Grid>
                            ) : (
                                <>
                                    {/* 読み込み時以外は作成済みのウォレットの情報を表で出力する。 */}
                                    <Grid container justifyContent="center">
                                        <Grid 
                                            container
                                            justifyContent="center"
                                            sx={{ 
                                                alignItems: 'center', 
                                                m: 1,
                                            }}
                                        >
                                            <p><strong>Wallet Info</strong></p>
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
                                                { wallets
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row, i) => {
                                                        /* WalletTableコンポーネントに値を詰めて描画する。 */
                                                        return (
                                                            <WalletTable 
                                                                _wallet={row} 
                                                                _columns={columns} 
                                                                row={row} 
                                                                index={i} 
                                                                provider={provider}
                                                                depositAction={(e) => {
                                                                    handleOpen(row)
                                                                }}
                                                            />);
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={wallets.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </>
                            )}
                        </>
                    )}
                </StyledPaper>
            </Box>
            {successFlg && (
                /* 成功時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="secdesc">Create Trasaction Successfull!!</div>
                </div>
            )}
            {failFlg && (
                /* 失敗時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="desc">Create Trasaction failfull..</div>
                </div>
            )}
        </Grid>
    );
}

export default Wallets;