import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import MuiDialogActions from '@material-ui/core/DialogActions';

import useStyles from './styles';

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function FullImage({ open, setOpen, img }) {

    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };


    return (
        
            <Dialog scroll='body' classes={{paper: classes.myLabel}} onClose={handleClose} open={open} style={{maxWidth: '100%', maxHeight: 'auto'}}>
                <img
                    src={img}
                    title='Full Image'
                    alt='Full'
                    style={{width: '100%', height: 'auto'}}
                />
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        
    );
}
