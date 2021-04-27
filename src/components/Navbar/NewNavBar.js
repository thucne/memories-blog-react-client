import { useState, useEffect, useCallback } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';

import useStyles from './styles2';

import NewSideMenu from './NewSideMenu';

//old
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Avatar } from '@material-ui/core';
import memories from '../../images/photo.png';
import decode from 'jwt-decode';

import dotenv from 'dotenv';
import SendEmail from './SendEmail';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { toggleSubcribe } from '../../actions/user';
import { useSelector } from 'react-redux';
// import { getInfo } from '../../actions/user';
import Progress from './Progress';
import Reload from './Reload';
import Search from './Search';
import Noti from './Noti';
import ChatIcon from '@material-ui/icons/Chat';
import FullImage from '../Posts/Post/FullImage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

dotenv.config();

//
const MainMenu = ({ isInfo, setIsInfo, setLinear, setSearchKey }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [sideMenu, setSideMenu] = useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const history = useHistory();

    //old declarations
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const [isChat, setIsChat] = useState(false);
    const [open, setOpen] = useState(false);
    const [openFull, setOpenFull] = useState(false);
    const [openNoti, setOpenNoti] = useState(false);
    const stateUser = useSelector((state) => state.user.info);

    //
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
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => { if (!isInfo) { setIsInfo(true); handleMenuClose(); return history.push('/info') }; if (isInfo) { handleMenuClose(); return history.push('/') } }}>Profile</MenuItem>
            <MenuItem onClick={logout}>Log out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {
                user ? (<>
                    <MenuItem>
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
                        <p>Avatar</p>
                    </MenuItem>
                    <MenuItem>
                        <IconButton color="inherit" onClick={() => setOpen(true)}>
                            <MailIcon />
                        </IconButton>
                        <p>Invite</p>
                    </MenuItem>
                    <MenuItem>
                        <IconButton color="inherit" onClick={() => { if (!isChat) { setIsChat(true); return history.push('/chat') }; if (isChat) history.push('/') }}>
                            <ChatIcon />
                        </IconButton>
                        <p>Chat</p>
                    </MenuItem>
                    {
                        !stateUser ? <Progress /> :
                            <MenuItem>
                                <IconButton color="inherit" onClick={() => dispatch(toggleSubcribe())}>
                                    {
                                        stateUser?.info?.subcribe ? <NotificationsActiveIcon /> : <NotificationsOffIcon />
                                    }
                                </IconButton>
                                <p>Mail subcription</p>
                            </MenuItem>
                    }
                    <MenuItem>
                        <IconButton color="inherit" onClick={() => { if (!isInfo) { setIsInfo(true); return history.push('/info') }; if (isInfo) history.push('/') }}>
                            <AccountCircle />
                        </IconButton>
                        <p>Profile</p>
                    </MenuItem>
                    <MenuItem>
                        <IconButton color="inherit" onClick={logout}>
                            <ExitToAppIcon />
                        </IconButton>
                        <p>Log out</p>
                    </MenuItem>
                </>) : (<>
                    <MenuItem>
                        <IconButton color="inherit" onClick={() => history.push('/auth')}>
                            <FingerprintIcon />
                        </IconButton>
                    </MenuItem>
                </>)
            }
        </Menu>
    );

    return (
        <div className={classes.grow}>
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
            <NewSideMenu sideMenu={sideMenu} setSideMenu={setSideMenu} setOpen={setOpen} setUser={setUser} setIsChat={setIsChat} />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setSideMenu(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography className={classes.title} variant="h6" noWrap>
                        MEmories
                    </Typography>


                    <div onClick={() => setOpenFull(true)}>
                        <img className={classes.image} src={memories} alt="memories" />
                    </div>

                    <Reload />
                    <Search setSearchKey={setSearchKey} />

                    <div className={classes.grow} />
                    {
                        user ? (<>
                            <Typography className={classes.username} variant="h6" noWrap>{user.result.name}</Typography>
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
                            <div className={classes.sectionDesktop}>
                                <IconButton color="inherit" onClick={() => setOpen(true)}>
                                    <MailIcon />
                                </IconButton>
                                <IconButton color="inherit" onClick={() => { if (!isChat) { setIsChat(true); return history.push('/chat') }; if (isChat) history.push('/') }}>
                                    <ChatIcon />
                                </IconButton>
                                {
                                    !stateUser ? <Progress /> :
                                        <IconButton color="inherit" onClick={() => dispatch(toggleSubcribe())}>
                                            {
                                                stateUser?.info?.subcribe ? <NotificationsActiveIcon /> : <NotificationsOffIcon />
                                            }
                                        </IconButton>
                                }
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </>) : (<>
                            <IconButton color="inherit" onClick={() => history.push('/auth')}>
                                <FingerprintIcon />
                            </IconButton>
                        </>)
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}

export default MainMenu;
