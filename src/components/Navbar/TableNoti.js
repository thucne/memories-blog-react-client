import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function DenseTable({setDelId, delId}) {
    const classes = useStyles();
    const rows = useSelector((state) => state.noti.noti);

    const toggle = (e) => {
        console.log(e);
        if (e.target.checked) {
            setDelId(e.target.id);
        } else {
            setDelId('');
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Content</TableCell>
                        <TableCell align="right">Button</TableCell>
                        <TableCell align="right">Link</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    inputProps={{ 'aria-labelledby': 'test' }}
                                    onClick={toggle}
                                    id={row._id}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.content}</TableCell>
                            <TableCell align="right">{row.button}</TableCell>
                            <TableCell align="right">{row.link}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
