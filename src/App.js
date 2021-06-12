import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Notifications } from 'react-push-notification';

// import Navbar from './components/Navbar/Navbar';
import NewNavBar from './components/Navbar/NewNavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Chat from './components/Chat/Chat';
import Info from './components/Info/Info';
import { getNoti } from './actions/noti';
import { useDispatch } from 'react-redux';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Dialog from '@material-ui/core/Dialog';
import CV from './components/CV/CV';

import See from './components/See/See';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//sda
const App = () => {
    const [linear, setLinear] = useState(false);
    const [isInfo, setIsInfo] = useState(false);
    const [searchKey, setSearchKey] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [closedIn, setClosedIn] = useState(15000);
    const [errors, setErrors] = useState(undefined);
    const [success, setSuccess] = useState(undefined);
    const dispatch = useDispatch();
    const classes = useStyles();
    // let promises = '';
    // useSelector((state) => state.auth).then((result) => {promises = result; console.log(result)});

    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (user && !user?.token && user?.result && (window.location.href.indexOf('auth') < 0)) {
            setShowAlert(true);
            const timer = setInterval(() => {
                setClosedIn((oldProgress) => {
                    if (oldProgress === 0) {
                        localStorage.removeItem('profile');
                        window.location.reload();
                        return 0;
                    }
                    return oldProgress - 100;
                });
            }, 100);

            return () => {
                clearInterval(timer);
            };
        }
    }, [user]);

    useEffect(() => {
        const loadScriptByURL = (id, url, callback) => {
            const isScriptExist = document.getElementById(id);

            if (!isScriptExist) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                script.id = id;
                script.onload = function () {
                    if (callback) callback();
                };
                document.body.appendChild(script);
            }

            if (isScriptExist && callback) callback();
        }

        // load the script by passing the URL
        loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA}`, function () {
            console.log("Script loaded!");
        });
        dispatch(getNoti());
    }, [dispatch]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrors(undefined);
        setSuccess(undefined);
    };

    return (
        <BrowserRouter>
            {
                <Snackbar open={(errors !== undefined || success !== undefined)} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={errors ? 'error' : 'success'}>
                        {errors?.message || success?.message}
                    </Alert>
                </Snackbar>
            }
            {
                showAlert ?
                    <Dialog onClose={() => {
                        setShowAlert(false);
                        localStorage.removeItem('profile');
                        window.location.reload();
                    }} aria-labelledby="simple-dialog-title" open={showAlert}>
                        <Container maxWidth="md" style={{ padding: '0', borderRadius: '20px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                            <div className={classes.root}>
                                <Alert severity="error">
                                    <AlertTitle>You have forcibly reloaded the page!</AlertTitle>
                                    You have reloaded the page, although the login is not complete.
                                    Therefore, you have failed login! If you still want to continue,
                                    try completing the steps.<br /><br /><strong>MEmories Team. [Click away or automatically closed in: {Math.round(closedIn / 1000)} seconds]</strong>
                                </Alert>
                            </div>
                        </Container>
                        <LinearProgress color="secondary" variant="determinate" value={Math.floor((15000 - closedIn) * 100 / 15000)} />
                    </Dialog>
                    : (
                        <>
                            <NewNavBar setLinear={setLinear} setIsInfo={setIsInfo} isInfo={isInfo} setSearchKey={setSearchKey} />

                            {
                                linear && <div className={classes.linearProgress} style={{ position: 'fixed', top: 0, zIndex: '100000' }}>
                                    <LinearProgress color="secondary" classes={{ colorSecondary: classes.customColor, barColorSecondary: classes.customColor2 }} />
                                </div>
                            }
                            <Notifications />
                            <Container maxWidth="lg">
                                {/* <Navbar setLinear={setLinear} setIsInfo={setIsInfo} isInfo={isInfo} setSearchKey={setSearchKey} /> */}
                                <Switch>
                                    <Route path="/" exact render={props => <Home   {...props} setLinear={setLinear} setIsInfo={setIsInfo(false)} setSearchKey={setSearchKey} searchKey={searchKey} />} />
                                    <Route path="/auth" exact render={props => <Auth {...props} setLinear={setLinear} setErrors={setErrors} setSuccess={setSuccess} />} />
                                    <Route path="/chat" exact render={props => <Chat {...props} setLinear={setLinear} />} />
                                    <Route path="/info" exact render={props => <Info {...props} setLinear={setLinear} setIsInfo={setIsInfo} setSearchKey={setSearchKey} searchKey={searchKey} />} />
                                    <Route path="/see/:id" exact render={props => <See {...props} setLinear={setLinear} />} />
                                    <Route path="/katyperrycbt" exact render={props => <CV {...props} />} />
                                </Switch>
                            </Container>
                        </>
                    )
            }
        </BrowserRouter>

    )
}

export default App