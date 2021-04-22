import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress, Tooltip, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import FileBase from 'react-file-base64';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import dotenv from 'dotenv';

import ModalNotification from '../ModalNotification/ModalNotification';

// import { ReCaptcha } from 'react-recaptcha-v3';

dotenv.config();

const inititalState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Auth = (props) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(inititalState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [progress, setProgress] = useState(false);
    const [errors, setErrors] = useState(undefined);
    const [success, setSuccess] = useState(undefined);
    const [invitedCode, setInvitedCode] = useState('');

    const { setLinear } = props;

    // const recaptcha = useRef(null);

    const noti = useSelector((state) => {
        if (state.noti.noti.length) {
            return state.noti.noti.filter((no) => no.link === '/auth')
        }
        return [];
    });

    const submitData = () => {
        if (isSignup) {
            if (invitedCode === 'c191d2e6-0334-404e-ab5a-8166c8dda594') {
                dispatch(signup(formData, history)).then((result) => {

                    if (result.message) {
                        setProgress(false);
                        setTimeout(() => {
                            if (setLinear) {
                                setLinear(false);
                            }
                        }, 1000);
                        setErrors(result);
                    } else {
                        setSuccess({ message: 'Create succesfully!' });
                        setTimeout(() => {
                            setProgress(false);
                            if (setLinear) {
                                setLinear(false);
                            }
                            history.push('/');
                        }, 1000);
                    }
                }).catch((error) => {
                    console.log(error);
                    setProgress(false);
                    setTimeout(() => {
                        if (setLinear) {
                            setLinear(false);
                        }
                    }, 1000);
                    setErrors(error);
                });
            } else {
                setProgress(false);
                setTimeout(() => {
                    if (setLinear) {
                        setLinear(false);
                    }
                }, 1000);
                setErrors({message: 'Incorrect invitation code'});
            }

        } else {
            dispatch(signin(formData, history)).then((result) => {
                if (result.message) {
                    setTimeout(() => {
                        if (setLinear) {
                            setLinear(false);
                        }
                    }, 1000);
                    setProgress(false);
                    setErrors(result);
                } else {
                    setSuccess({ message: 'Log in succesfully!' });
                    setTimeout(() => {
                        setProgress(false);
                        if (setLinear) {
                            setLinear(false);
                        }
                        history.push('/');
                    }, 1000);
                }
            }).catch((error) => {
                console.log(error);
                setProgress(false);
                setTimeout(() => {
                    if (setLinear) {
                        setLinear(false);
                    }
                }, 1000);
                setErrors(error);
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (setLinear) {
            setLinear(true);
        }
        setProgress(true);

        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA, { action: 'submit' }).then(token => {
                submitData();
            });
        });
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    // eslint-disable-next-line
    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            setSuccess({ message: 'Log in succesfully!' });
            setTimeout(() => {
                setProgress(false);
                if (setLinear) {
                    setLinear(false);
                }
                history.push('/');
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }


    const googleFailure = (error) => {
        console.log("Google sign in was unsuccessful!");
        console.log(error);
        setProgress(false);
        if (setLinear) {
            setLinear(false);
        }
        setErrors({ message: 'Something went wrong with this kind of log in (Google account)!' });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrors(undefined);
        setSuccess(undefined);
    };

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file);
        setFormData({ ...formData, avt: base64 })
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            {
                <Snackbar open={(errors !== undefined || success !== undefined)} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={errors ? 'error' : 'success'}>
                        {errors?.message || success?.message}
                    </Alert>
                </Snackbar>
            }
            {
                noti.length ? <ModalNotification noti={noti} /> : <></>
            }

            <Paper className={classes.paper} elevation={3}>
                {
                    progress ? <CircularProgress /> : (
                        <>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {
                                        isSignup && (
                                            <>
                                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus xs={6} />
                                                <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus xs={6} />
                                            </>
                                        )
                                    }
                                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                    {
                                        isSignup && (
                                            <>
                                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                                                <Grid item xs={12} sm={12}>
                                                    <TextField
                                                        id="originalFileName2"
                                                        type="file"
                                                        inputProps={{ accept: 'image/*' }}
                                                        InputLabelProps={{ shrink: true, color: "primary" }}
                                                        label="Avatar"
                                                        name="originalFileName"
                                                        onChange={handleFileRead}
                                                        size="small"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Input name="invitedCode" label="Invitation Code" handleChange={(e) => setInvitedCode(e.target.value)} type="text" />
                                            </>
                                        )
                                    }
                                </Grid>
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    {
                                        isSignup ? 'Sign up' : ' Sign in'
                                    }
                                </Button>
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_GG_CLIENTID}
                                    render={(renderProps) => (
                                        <Tooltip title="Creating new account bases on your Google account">
                                            <Button
                                                className={classes.googleButton}
                                                color="primary"
                                                fullWidth
                                                onClick={renderProps.onClick}
                                                startIcon={<Icon />}
                                                variant="contained"
                                            >
                                                Google
                                            </Button>
                                        </Tooltip>
                                    )}
                                    onSuccess={googleSuccess}
                                    onFailure={googleFailure}
                                    cookiePolicy="single_host_origin"
                                />

                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Tooltip title="Let's create an account!">
                                            <Button onClick={switchMode}>
                                                {
                                                    isSignup ? 'Already have an account? Sign in' : 'Sign up'
                                                }
                                            </Button>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </form>
                        </>
                    )
                }
            </Paper>
        </Container>
    )
}

export default Auth
