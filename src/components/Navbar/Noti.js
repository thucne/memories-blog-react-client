import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import { createNoti, delNoti } from '../../actions/noti';
import { useDispatch } from 'react-redux';
import dotenv from 'dotenv';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

import TableNoti from './TableNoti';

dotenv.config();

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
}));

const Noti = ({ openNoti, setOpenNoti, setLinear }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ title: '', content: '', button: '', link: '' });
    const [delId, setDelId] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const handleClose = () => {
        setOpenNoti(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }
        if (setLinear) setLinear(true);
        dispatch(createNoti(formData)).then(() => {
            if (setLinear) setLinear(false);
            setSuccess(true);
            setLoading(false);
            setFormData({ title: '', content: '', button: '', link: '' })
        }).catch(() => {
            if (setLinear) setLinear(false);
            setSuccess(true);
            setLoading(false);
        })
    }
    const handleDelete = (e) => {
        e.preventDefault();
        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }
        if (setLinear) setLinear(true);
        dispatch(delNoti(delId)).then(() => {
            if (setLinear) setLinear(false);
            setSuccess(true);
            setLoading(false);
            setDelId('');
        }).catch(() => {
            if (setLinear) setLinear(false);
            setSuccess(true);
            setLoading(false);
        })
    }

    return (
        <Dialog open={openNoti} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Modal Notification</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Creating new notification
                </DialogContentText>
                <form className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <TextField name="title" required variant="outlined" value={formData.title} label="Title" fullWidth onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <TextField name="content" required variant="outlined" value={formData.content} label="Content" fullWidth onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
                    <TextField name="button" required variant="outlined" value={formData.button} label="Button" fullWidth onChange={(e) => setFormData({ ...formData, button: e.target.value })} />
                    <TextField name="link" required variant="outlined" value={formData.link} label="Link" fullWidth onChange={(e) => setFormData({ ...formData, link: e.target.value })} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <div className={classes.root}>
                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={buttonClassname}
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            Post
                            </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </div>
            </DialogActions>
            <DialogContent style={{ margin: '5px 5px 20px 5px' }}>
                <TableNoti setDelId={setDelId} delId={delId} />
            </DialogContent>
            {
                delId && <DialogContent>
                    <DialogContentText>
                        Selected {delId}
                    </DialogContentText>
                </DialogContent>
            }
            <DialogActions>
                <div className={classes.root}>
                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={buttonClassname}
                            disabled={loading}
                            onClick={handleDelete}
                        >
                            Delete
                            </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default Noti;