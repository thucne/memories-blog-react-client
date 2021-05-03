import React from 'react';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';


import Tooltip from '@material-ui/core/Tooltip';

import useStyles from './styles3';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import './index.css';


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

export default function SwipeableTemporaryDrawer({ sideMenu, setSideMenu, setOpen, setUser, setIsChat }) {
    const classes = useStyles();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClose = (e) => {
        setSideMenu(false);
    }

    const handleOpen = () => {
        setSideMenu(true);
    }

    const handleAction1 = (e) => () => {
        switch (e) {
            case 0:
                history.push('/');
                break;
            case 1:
                history.push('/info');
                break;
            case 2:
                history.push('/chat')
                break;
            case 3:
                setOpen(true);
                break;
            default:
                dispatch({ type: 'LOGOUT' });
                setUser(null);
                // setIsChat(false);
                history.push('/');
                break;
        }
        handleClose();
        return <></>;
    }

    const handleAction2 = (e) => () => {
        switch (e) {
            case 0:
                history.push('/katyperrycbt');
                break;
            default:
                history.push('/katyperrycbt');
                break;
        }
        handleClose();
        return <></>
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        >
            <List style={{ padding: '10px 20px 10px 20px' }}>
                <Typography variant="h4">
                    MEmories
                </Typography>
                <Typography variant="subtitle1">
                    v3.5.2021
                </Typography>
                <img src='/photo.png' alt='img' width={100} height={100} />
            </List>
            <Divider />
            <List>
                {['Home page', 'Profile', 'Chat', 'Invite', 'Log out'].map((text, index) => (
                    <ListItem button key={text} onClick={handleAction1(index)} disabled={user === null && text === 'Invite'}>
                        <ListItemIcon>
                            {(index === 0) && <HomeOutlinedIcon />}
                            {(index === 1) && <AccountCircleOutlinedIcon />}
                            {(index === 2) && <ChatOutlinedIcon />}
                            {(index === 3) && <EmailOutlinedIcon />}
                            {(index === 4) && <ExitToAppOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['About', 'Contact'].map((text, index) => (
                    <ListItem button key={text} onClick={handleAction2(index)}>
                        <ListItemIcon>
                            {(index === 0) && <InfoOutlinedIcon />}
                            {(index === 1) && <CallOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List style={{ padding: '5px 10px 5px 10px' }}>
                <Typography variant="h6">
                    MEmories
                </Typography>
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit">Property of Katyperrycbt</Typography>
                            {'This website is owned by Katyperrycbt (Tran Trong Thuc)'}
                        </React.Fragment>
                    }
                >
                    <Typography variant="body1">Copyright &copy; 2021 Katyperrycbt - Tran Trong Thuc. All rights reserved.</Typography>
                </HtmlTooltip>
            </List>
        </div>
    );

    return (
        <div style={{padding: 0, margin: 0, display: sideMenu ? '' : 'none'}}>
            <React.Fragment key='left'>
                <SwipeableDrawer
                    anchor={'left'}
                    open={sideMenu}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    disableBackdropTransition={!iOS}
                    disableDiscovery={iOS}
                >
                    {list('top')}
                </SwipeableDrawer>
            </React.Fragment>

        </div>
    );
}
