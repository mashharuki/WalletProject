// mui関連のコンポーネントのインポート
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from "react";
import './../../../assets/css/App.css';
import {
      PINTAGatewayURL
} from './../../common/Constant';


/**
 * VcTable Component
 */
const VcTable = (props) => {
      // propsから引数を取得する。
      const { 
            _vc, 
            _columns, 
            index, 
            downloadAction
      } = props;

      return (
            <TableRow hover role="checkbox" tabIndex={-1}>
                  {_columns.map((column) => {
                        // セルに格納する値用の変数
                        let value = _vc; 
                        // カラムの値により、セットする値を変更する。
                        if(column.label === "No.") {
                              return (
                                    <TableCell key={column.id} align={column.align}>
                                          {index + 1}
                                    </TableCell>
                              );
                        }
                        if(column.label === "Name") {
                              return (
                                    <TableCell key={column.id} align={column.align}>
                                          {value.name}
                                    </TableCell>
                              )
                        } 
                        if(column.label === "Action") {
                              return (
                                    <TableCell key={column.id} align={column.align}>
                                          <a href={`${PINTAGatewayURL}/${value.cid}`}>
                                                download
                                          </a>
                                    </TableCell>
                              )
                        }        
                  })}
            </TableRow>
      );
};

export default VcTable;