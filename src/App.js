import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Notifications } from 'react-push-notification';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Chat from './components/Chat/Chat';
import Info from './components/Info/Info';
import { getNoti } from './actions/noti';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

//sda
const App = () => {
    const [linear, setLinear] = useState(false);
    const [isInfo, setIsInfo] = useState(false);
    const [searchKey, setSearchKey] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();

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


    return (
        <BrowserRouter>

            {
                linear && <div className={classes.linearProgress} style={{ position: 'fixed', top: '0', zIndex: '1000' }}>
                    <LinearProgress color="secondary" />
                </div>
            }
            <Notifications />
            <Container maxWidth="lg">
                <Navbar setLinear={setLinear} setIsInfo={setIsInfo} isInfo={isInfo} setSearchKey={setSearchKey} />
                <Switch>
                    <Route path="/" exact render={props => <Home {...props} setLinear={setLinear} setIsInfo={setIsInfo(false)} setSearchKey={setSearchKey} searchKey={searchKey} />} />
                    <Route path="/auth" exact render={props => <Auth {...props} setLinear={setLinear} />} />
                    <Route path="/chat" exact render={props => <Chat {...props} setLinear={setLinear} />} />
                    <Route path="/info" exact render={props => <Info {...props} setLinear={setLinear} setIsInfo={setIsInfo} setSearchKey={setSearchKey} searchKey={searchKey} />} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App