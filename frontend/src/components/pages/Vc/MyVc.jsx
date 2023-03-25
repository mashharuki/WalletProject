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
import './../../../assets/css/App.css';
import { useMyContext } from './../../../Contexts';
import MainContainer from './../../common/MainContainer';
import {
    getDid,
    getVcs
} from './../../hooks/UseContract';
import VcTable from "./VcTable";

/**
 * 表の最上位ヘッダー部の配列
 */
const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 150, align: 'center'},
    { id: 'action', label: 'Action', minWidth: 50, align: 'center'},
];

/** 
 * StyledPaperコンポーネント
 */
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 600,
    minHeight: 200,
    backgroundColor: 'rgb(150, 144, 144)'
}));

/**
 * MyVC Component
 */
const MyVC = (props) => {
    // create contract
    const {
        currentAccount
    } = useMyContext();

    const [vcs, setVcs] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /**
     * init function
     */
    const init = async()=> {
        // get did
        var did = await getDid(currentAccount);
        var result = await getVcs(did);
        setVcs(result);
    };

    /**
     * downloadAction function
     * @param cid VC's CID
     * @param name Vc's file name
     */
    const downloadAction = (cid, name) => {
        // get file
        /*
        axios.get(`${PINTAGatewayURL}/${cid}`, {
            responseType: 'blob',
        })
        .then((res) => {
            fileDownload(res.data, name)
        });
        */
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


    useEffect(() => {
        init();
    });

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
                <Grid container justifyContent="center">
                    <Grid 
                        container
                        justifyContent="center"
                        sx={{ 
                            alignItems: 'center', 
                            m: 1,
                        }}
                    >
                        <p><strong>My Verifiable Credentials</strong></p>
                    </Grid>
                </Grid>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell 
                                        key={column.id} 
                                        align={column.align} 
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { vcs
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    return (
                                        <VcTable 
                                            _vc={row} 
                                            _columns={columns} 
                                            index={i} 
                                            downloadAction={downloadAction(row.cid, row.name)}
                                        />);
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={vcs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </StyledPaper>
        </MainContainer>
    );
};

export default MyVC;