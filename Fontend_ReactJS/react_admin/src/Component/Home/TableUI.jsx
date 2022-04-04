import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from "react-router-dom";

const Styles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function TableUI(props) {
    const history = useHistory();
    const moment = require('moment')
    console.log("history",history.location.pathname.slice(7))
    const classes = Styles();
    const columns = props.columns;
    const data = props.rows;
    const fill = props.fill;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((columns, index) => {
                                    return (
                                        <TableCell key={index}>{columns}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow >
                                    <TableCell>{index+1}</TableCell>
                                    {
                                        fill.map((fill,index) =>{
                                            if(fill === "create_at"){
                                                return(
                                                    <TableCell key={index}>{moment(row[fill]).utc().format('DD/MM/YYYY')}</TableCell>
                                                )
                                            }else return(
                                                <TableCell>{row[fill]}</TableCell>
                                            )
                                        })
                                    }
                                    <TableCell>
                                        <td className="warning">SỬA</td>
                                        <td className="primary">XEM</td>
                                        <td className="danger">XÓA</td>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={data.length}
                rowsPerPage={5}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default TableUI;