import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from '@material-ui/core';

const ModalNotification = ({noti}) => {
    const [open, setOpen] = useState(true); 
    const handleClose2 = () => {
        setOpen(false);
      };
    return (
        <Dialog
                open={open}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='xs'
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{noti[0].title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {noti[0].content}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2} color="primary" autoFocus>
                        {noti[0].button}
                    </Button>
                </DialogActions>
            </Dialog>
    )
}

export default ModalNotification;