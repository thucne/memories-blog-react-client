/* global google */
import React, { useState, useEffect } from 'react';
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

import { signin, signup } from '../../actions/auth';
import dotenv from 'dotenv';

import ModalNotification from '../ModalNotification/ModalNotification';

// import { getInfo } from '../../actions/user';
// import { ReCaptcha } from 'react-recaptcha-v3';
import StepperCustom from './Stepper';
import { checkEmail } from '../../actions/invite';

import jwt_decode from 'jwt-decode';
import { ReactComponent as Google } from './gg.svg';
import { ReactComponent as MEmories } from './me.svg';

dotenv.config();

const inititalState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', invitationCode: '' };

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
    const [showStepper, setShowStepper] = useState(false);
    const [doneCreate, setDoneCreate] = useState(false);
    const [result, setResult] = useState('');
    const [token, setToken] = useState('');
    const [showGG, setShowGG] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile')) === null;
    const [ok, setOk] = useState(false);

    const { setLinear } = props;

    useSelector((state) => state.auth).then((result) => { if (!result.authData) { setShowGG(true) } else { setShowGG(false) } });

    const handleCallBack = (res) => {
        const decodedObject = jwt_decode(res.credential);

        const prepare = {
            tokenId: res.credential,
            profileObj: {
                email: decodedObject.email,
                familyName: decodedObject.family_name,
                givenName: decodedObject.given_name,
                googleId: decodedObject.sub,
                imageUrl: decodedObject.picture,
                name: decodedObject.name
            }
        }

        googleSuccess(prepare);
        return;
    }

    const check = async () => {
        if (!user) setShowGG(false);
        if (user) setShowGG(true);
    }

    useEffect(() => {
        async function run() {
            await check();
            if (google !== undefined && showGG && !ok) {
                google.accounts.id.initialize({
                    client_id: process.env.REACT_APP_GG_CLIENTID,
                    callback: handleCallBack
                });
                google.accounts.id.prompt(notification => {
                    if (notification.isNotDisplayed()) {
                        console.log(notification.getNotDisplayedReason());
                    }
                })
            }
        }

        run();
    })

    const noti = useSelector((state) => {
        if (state.noti.noti.length) {
            return state.noti.noti.filter((no) => no.link === '/auth')
        }
        return [];
    });

    const submitData = () => {

        setShowGG(false);
        setOk(true);

        if (isSignup) {
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
                        return <></>
                    }, 200);
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
                    setSuccess({ message: 'Log in successfully!' });
                    // dispatch({ type: 'AUTH', data: result });
                    setTimeout(() => {
                        setProgress(false);
                        if (setLinear) {
                            setLinear(false);
                        }
                        history.push('/');
                    }, 200);
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
        setShowGG(false);
        setOk(true);
        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA, { action: 'submit' }).then(token => {
                setShowGG(false);
                setOk(true);
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

    const googleSuccess = (res) => {
        const tempResult = res?.profileObj;
        const tempToken = res?.tokenId;

        setShowGG(false);
        setOk(true);

        setSuccess({ message: 'Welcome to MEmories!' });

        try {
            dispatch(checkEmail(tempResult.email)).then((result) => {

                if (!result.message) {
                    dispatch({ type: 'AUTH', data: { result: tempResult, token: tempToken } });

                    setTimeout(() => {
                        setProgress(false);
                        if (setLinear) {
                            setLinear(false);
                        }
                        history.push('/');
                    }, 200);

                } else {
                    tempResult.incomplete = false;
                    dispatch({ type: 'AUTH', data: { result: tempResult } });
                    if (!doneCreate) {
                        setShowStepper(true);
                    }
                    setToken(tempToken);
                    setResult(tempResult);
                }
            }).catch((err) => {
                tempResult.incomplete = false;
                dispatch({ type: 'AUTH', data: { result: tempResult } });
                if (!doneCreate) {
                    setShowStepper(true);
                }
                setToken(tempToken);
                setResult(tempResult);
            });

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
            {
                showStepper && <StepperCustom setSuccess={setSuccess} setErrors={setErrors} setLinear={setLinear} activeStep={1} setDoneCreate={setDoneCreate} result={result} token={token} />
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
                                                <Input name="invitationCode" label="Invitation Code" handleChange={handleChange} type="text" />
                                            </>
                                        )
                                    }
                                </Grid>
                                <Button
                                    type="submit"
                                    className={classes.submit}
                                    color="primary"
                                    fullWidth
                                    startIcon={<MEmories />}
                                    variant="contained"
                                >
                                    {
                                        isSignup ? 'Sign up with MEmories' : ' Sign in with MEmories'
                                    }
                                </Button>
                                {/* <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                </Button> */}
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_GG_CLIENTID}
                                    render={(renderProps) => (
                                        <Tooltip title="Creating new account bases on your Google account">
                                            <Button
                                                className={classes.googleButton}
                                                color="primary"
                                                fullWidth
                                                onClick={renderProps.onClick}
                                                startIcon={<Google />}
                                                variant="contained"
                                            >
                                                Sign in with Google
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
