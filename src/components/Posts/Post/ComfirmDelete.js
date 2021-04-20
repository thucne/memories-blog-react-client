import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const confirmDelete = ({ open, setOpen, setIsDel }) => {

    const handleClose = () => {
        setOpen(false);
    };

    const handleSet = () => {
        setIsDel(true);
        handleClose();
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure? Once you delete, it cannot be undone!
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No, I want to reconsider!
          </Button>
                    <Button onClick={handleSet} color="primary" autoFocus>
                        Yes, I want to delete it!
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default confirmDelete;
