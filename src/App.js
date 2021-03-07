import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Chat from './components/Chat/Chat';

const user = JSON.parse(localStorage.getItem('profile'));
const App = () => {

    return (
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/auth" exact component={Auth}/>
                    {
                        user && <Route path="/chat" exact component={Chat}/>
                    }
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App