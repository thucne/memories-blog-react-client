import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputEdit from './InputEdit';
import useStyle from './styles';
import FileBase from 'react-file-base64';
import { Typography } from '@material-ui/core';
import { signup } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NewGGUser({ setSuccess, setErrors, disableCancelButton, results, token, myStepper, setDoneCreate, setOpenErr, setErrMsg, setLinear, setOpen, formShow, setFormShow, ggId, ggEmail, ggFirstName, ggLastName, ggAvt }) {

    const inititalState = { firstName: (ggFirstName || ''), lastName: (ggLastName || ''), email: (ggEmail || ''), ggId: (ggId || ''), avt: (ggAvt || ''), invitationCode: '' };
    const dispatch = useDispatch();
    const history = useHistory();
    const [open2, setOpen2] = useState(false);
    const classes = useStyle();
    const [formData, setFormData] = useState(inititalState);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');

    const handleClose = () => {
        if (setFormShow) setFormShow(false);
    };

    const handleChange = (e) => {
        if (setFormData) setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitData = () => {
        dispatch(signup(formData, history)).then((result) => {
            // if (results && token) {localStorage.setItem('profile', JSON.stringify({result, token}))}
            if (result?.message) {
                setErrors(result);
                // if(results) {
                //     localStorage.setItem('profile', JSON.stringify({result: results}));
                // }
                setTimeout(() => {
                    if (setLinear) {
                        setLinear(false);
                        if (setErrMsg) setErrMsg(result.message);
                        if (setOpenErr) setOpenErr(true);
                        setOpen2(false);
                    }
                }, 1000);
                // if (results && token) {localStorage.setItem('profile', JSON.stringify({result}))}
                // window.location.reload();

            } else {
                if (results && token) {
                    dispatch({ type: 'AUTH', data: { result: results, token } });
                }
                setSuccess({ message: 'Created linked account! Welcome to MEmories!' });

                setTimeout(() => {
                    if (setDoneCreate) {
                        setDoneCreate(true);
                    }
                    if (setLinear) {
                        setLinear(false);
                        if (setOpen) setOpen(true);
                        setOpen2(false);
                    }
                    history.push('/');
                }, 1000);
            }
        }).catch((error) => {
            setErrors(error);
            console.log('Error is', error);
            if (setLinear) setLinear(false);
            setOpen2(false);
            setSnackMessage(error.message);
            setOpenSnack(true);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (results) {
            localStorage.setItem('profile', JSON.stringify({ result: results, token }));
        }
        setOpen2(true);
        if (setLinear) {
            setLinear(true);
        }

        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA, { action: 'submit' }).then(token => {
                submitData();
            });
        });
    }

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
        setSnackMessage('');
    };

    return (
        <div>
            {
                <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity="success">
                        {snackMessage}
                    </Alert>
                </Snackbar>
            }
            <Dialog open={formShow ? formShow : true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create account</DialogTitle>
                <DialogContent>
                    {myStepper}
                    <DialogContentText>
                        To create an account that linked with your current Google account, you need to fill these fields below if any.
                    </DialogContentText>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <InputEdit name="firstName" label="First Name" handleChange={handleChange} xs={6} autoFocus inValue={ggFirstName} vari={ggFirstName.length > 0} />
                        <InputEdit name="lastName" label="Last Name" handleChange={handleChange} xs={6} autoFocus inValue={ggLastName} vari={ggLastName.length > 0} />
                        <InputEdit name="email" label="Email Address" handleChange={handleChange} xs={6} type="email" inValue={ggEmail} vari={ggEmail.length > 0} />
                        <InputEdit name="ggId" label="Google ID" handleChange={handleChange} xs={6} inValue={ggId} vari={ggId.length > 0} />
                        {
                            !ggAvt ? (
                                <>
                                    <Typography style={{ color: 'gray', margin: '8px' }}>Avatar</Typography>
                                    <div className={classes.fileInput}><FileBase type="file" required multiple={false} onDone={({ base64 }) => setFormData({ ...formData, avt: base64 })} /></div>
                                </>
                            ) : (
                                <InputEdit name="ggAvt" label="Avatar" handleChange={handleChange} inValue={ggAvt} vari={ggAvt.length > 0} />
                            )
                        }
                        <InputEdit name="password" label="Password" handleChange={handleChange} xs={6} type="password" />
                        <InputEdit name="confirmPassword" label="Repeat Password" handleChange={handleChange} xs={6} type="password" />
                        <InputEdit name="invitationCode" label="Invitation Code" handleChange={handleChange} xs={6} type="text" />
                        <DialogActions>
                            <Button onClick={handleClose} style={{ display: disableCancelButton ? 'none' : '' }} color="primary">
                                Cancel
                            </Button>
                            {
                                open2 ? <CircularProgress color="secondary" /> :
                                    <Button type='submit' color="primary">
                                        Create
                                </Button>
                            }
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
