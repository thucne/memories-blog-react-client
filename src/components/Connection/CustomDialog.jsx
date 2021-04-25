import { useRef, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';
import useStyles from './styles';

export default function CustomDialog({ open, setOpen, node1, node2, node3 }) {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <Container maxWidth="xl">
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth='lg'
                classes={{paperWidthLg: classes.dialog}}
            >
                <DialogTitle id="scroll-dialog-title">{node1}</DialogTitle>
                <DialogContent dividers={true} style={{ padding: 0 }}>
                    <DialogContent
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {node2}
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    {node3}
                </DialogActions>
            </Dialog>
        </Container>
    );
}
