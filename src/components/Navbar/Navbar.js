import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Typography, Toolbar, Tooltip } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/photo.png';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import decode from 'jwt-decode';

import dotenv from 'dotenv';
import SendEmail from './SendEmail';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { toggleSubcribe } from '../../actions/user';
import { useSelector } from 'react-redux';
// import { getInfo } from '../../actions/user';
import Progress from './Progress';
import Reload from './Reload';
import Search from './Search';
import Noti from './Noti';

import FullImage from '../Posts/Post/FullImage';

dotenv.config();

const Navbar = ({ isInfo, setIsInfo, setLinear, setSearchKey }) => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [isChat, setIsChat] = useState(false);
    const [open, setOpen] = useState(false);
    const [openFull, setOpenFull] = useState(false);
    const [openNoti, setOpenNoti] = useState(false);

    const stateUser = useSelector((state) => state.user.info);

    const httpToHTTPS = (str, from, what) => {
        if (str) {
            return str.substring(0, from) + what + str.substring(from);
        }
        return '';
    }

    const logout = useCallback(
        () => {
            dispatch({ type: 'LOGOUT' });
            setUser(null);
            setIsChat(false);
            // window.location.reload();
            history.push('/');
        }, [dispatch, history]
    )

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, logout, user?.token])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            {
                open &&
                <SendEmail
                    setLinear={setLinear}
                    open={open}
                    setOpen={setOpen}
                />
            }
            {
                openFull && <FullImage open={openFull} setOpen={setOpenFull} img={memories} />
            }
            {
                process.env.REACT_APP_THUC_KATY === user?.result?.email && <Noti openNoti={openNoti} setOpenNoti={setOpenNoti} setLinear={setLinear} />
            }
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">MEmories</Typography>
                <div onClick={() => setOpenFull(true)}>
                    <img className={classes.image} src={memories} alt="memories" height="60" />
                </div>
                <Reload />
                <Search setSearchKey={setSearchKey} />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        {
                            !stateUser ? <Progress /> :
                                <Tooltip title='Email subcription' placement='left'>
                                    <FormControlLabel
                                        style={{ marginLeft: '20px' }}
                                        control={
                                            <Checkbox
                                                icon={<NotificationsOffIcon style={{ color: 'blue' }} fontSize="small" className={classes.star} />}
                                                checkedIcon={<NotificationsActiveIcon style={{ color: 'blue' }} fontSize="small" className={classes.star} />}
                                                name="checkedI"
                                                checked={stateUser?.info?.subcribe ? true : false}
                                            />
                                        }
                                        onClick={() => dispatch(toggleSubcribe())}
                                    />
                                </Tooltip>
                        }
                        {
                            !isInfo ? (
                                <>
                                    <Avatar
                                        className={classes.purple}
                                        alt={user.result.name}
                                        src={user.result.imageUrl || httpToHTTPS(user.result.avt, 4, 's')}
                                        onClick={() => {
                                            process.env.REACT_APP_THUC_KATY === user?.result?.email && setOpenNoti(true);
                                        }}
                                        style={{ border: process.env.REACT_APP_THUC_KATY === user?.result?.email && '5px solid #FFD700', cursor: process.env.REACT_APP_THUC_KATY === user?.result?.email && 'pointer' }}
                                    >
                                        {user.result.name.charAt(0)}
                                    </Avatar>
                                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                                    <Button component={Link} to='/info' variant="contained" className={classes.seeInfo} color="primary" style={{ marginLeft: '5px' }} onClick={() => { setIsInfo(true) }}>Info</Button>
                                </>
                            ) : (
                                <Button component={Link} to='/' variant="contained" className={classes.seeInfo} color="primary" style={{ marginLeft: '5px' }} onClick={() => { setIsInfo(false) }}>Back</Button>
                            )
                        }
                        {
                            !isChat ? (
                                <Button component={Link} to='/chat' variant="contained" className={classes.chatting} color="primary" style={{ marginLeft: '5px' }} onClick={() => { setIsChat(true) }}>Chatting</Button>
                            ) : (
                                <Button component={Link} to='/' variant="contained" className={classes.chatting} color="primary" style={{ marginLeft: '5px' }} onClick={() => { setIsChat(false) }}>Back</Button>
                            )
                        }
                        <Button component={Link} to='' variant="contained" className={classes.logout} color="primary" onClick={logout} style={{ marginLeft: '5px' }} >Log out</Button>
                        <Button component={Link} to='' variant="contained" className={classes.mailGun} color="primary" onClick={() => setOpen(true)} style={{ marginLeft: '5px' }} >{process.env.REACT_APP_THUC_KATY === user?.result?.email ? 'Send Mail' : 'Invite'}</Button>

                    </div>
                ) : (
                    <Button className={classes.logout} component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;