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

export default function NewGGUser({ setOpenErr, setErrMsg, setLinear, setOpen, formShow, setFormShow, ggId, ggEmail, ggFirstName, ggLastName, ggAvt }) {

    const inititalState = { firstName: (ggFirstName || ''), lastName: (ggLastName || ''), email: (ggEmail || ''), ggId: (ggId || ''), avt: (ggAvt || '') };
    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyle();
    const [formData, setFormData] = useState(inititalState);

    const handleClose = () => {
        setFormShow(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (setLinear) {
            setLinear(true);
        }
        dispatch(signup(formData, history)).then((result) => {

            if (result.message) {
                setTimeout(() => {
                    if (setLinear) {
                        setLinear(false);
                        setErrMsg(result.message);
                        setOpenErr(true);
                    }
                }, 1000);

            } else {
                setTimeout(() => {
                    if (setLinear) {
                        setLinear(false);
                        setOpen(true);
                    }
                    history.push('/');
                }, 1000);
            }
        }).catch((error) => {
            console.log(error);
            if (setLinear) setLinear(false);
        });
    }

    return (
        <div>
            <Dialog open={formShow} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create account</DialogTitle>
                <DialogContent>
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
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type='submit' color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
