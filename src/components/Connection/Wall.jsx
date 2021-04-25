import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';

import { getWall, toggleFollow } from '../../actions/wall';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CustomDialog from './CustomDialog';
import { Container, Grid, Avatar, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import FacebookProgress from './FacebookProgress';
import ToggleTabs from './ToggleTabs';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import LooksOneOutlinedIcon from '@material-ui/icons/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@material-ui/icons/LooksTwoOutlined';
import Looks3OutlinedIcon from '@material-ui/icons/Looks3Outlined';
import Looks4OutlinedIcon from '@material-ui/icons/Looks4Outlined';
import Looks5OutlinedIcon from '@material-ui/icons/Looks5Outlined';
import Looks6OutlinedIcon from '@material-ui/icons/Looks6Outlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';


import Posts from './Posts';

function Alert(props) {
    return <MuiAlert elevation={6} variant="outlined" {...props} />;
}
const httpToHTTPS = (str, from, what) => {
    if (str) {
        return str.substring(0, from) + what + str.substring(from);
    }
    return '';
}
const Wall = ({ id, open, setOpen }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const wall = useSelector((state) => state.wall.wall);
    const rawPosts = useSelector((state) => state.posts);

    let posts = [];

    if (!posts.length) {
        if (rawPosts) {
            for (let i = 0;  i < rawPosts.length; i++) {
                if (rawPosts[i]['creator'] === id) posts.push(rawPosts[i]);
            }
        }
    }

    const [kindAlert, setKindAlert] = useState('success');
    const [alertContent, setAlertContent] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [progress, setProgress] = useState(false);
    const [tab, setTab] = useState(0);


    const state = useSelector((state) => state.user.info.info.follow);

    const followThisUser = state ? (state.indexOf(id) > -1) : false;

    const follow = followThisUser;

    let infoKeyValue = [];

    const tempArray = [
        <LooksOneOutlinedIcon />,
        <LooksTwoOutlinedIcon />,
        <Looks3OutlinedIcon />,
        <Looks4OutlinedIcon />,
        <Looks5OutlinedIcon />,
        <Looks6OutlinedIcon />,
    ];

    const getIcon = (key) => {
        switch (key) {
            case 'subcribe':
                return <SubscriptionsOutlinedIcon />
            default:
                if (tempArray.length) {
                    const temp = tempArray[0];
                    tempArray.splice(0, 1);
                    return temp;
                } else {
                    return <SubjectOutlinedIcon />
                }
        }
    }

    if (wall && wall?.info?.info && infoKeyValue.length === 0) {
        for (var key of Object.keys(wall.info.info)) {
            infoKeyValue.push({
                icon: getIcon(key),
                key,
                value: wall.info.info[key]
            })
        }
    }

    useEffect(() => {
        dispatch(getWall(id)).then((result) => {
            setKindAlert('success');
            setAlertContent('Done!');
            setShowAlert(true);
        }).catch((error) => {
            setKindAlert('error');
            setAlertContent(error.message);
            setShowAlert(true);
        });
    }, [dispatch, id]);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
        setKindAlert('success');
        setAlertContent('');
    }

    const toggleFollowAction = async () => {
        setProgress(true);
        await dispatch(toggleFollow(id)).then((result) => {
            setKindAlert('success');
            setAlertContent('Done!');
            setShowAlert(true);
            setProgress(false);
        }).catch((error) => {
            setKindAlert('error');
            setAlertContent(error.message);
            setShowAlert(true);
            setProgress(false);
        });

    }

    const Node1 = () => {
        return <Grid className={classes.fullWidthFlexScretch} container spacing={2}>
            <Grid item className={classes.flex} xs={12}>
                <Avatar src='photo.png' alt='img' className={classes.large} />
                <Typography variant="h5">Seeing {wall?.info?.name}'s wall</Typography>
            </Grid>
        </Grid>
    }

    const Node2 = () => {
        return <Grid className={classes.fullWidthFlexScretch} container spacing={2}>
            <Grid item className={classes.flex} xs={12}>
                <div className={classes.coverbackground}><img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1616074004/zjty1llkh4kivufcd7we.jpg' alt="background" className={classes.background} /></div>
                <Avatar src={httpToHTTPS(wall?.info?.avt, 4, 's')} alt="user's avatar" className={classes.avatar} />
            </Grid>
            <Grid item className={classes.flex} xs={12}>
                <ToggleTabs tab={tab} setTab={setTab} />
            </Grid>
            <Grid container className={`${classes.fullWidthFlexScretch} ${classes.align}`} spacing={3}>
                <Grid item className={`${classes.flex}`} md={3} xs={12} style={{ padding: '5px', height: 'fit-content' }}>
                    <div className={classes.decor} style={{ color: '#304ffe' }}>
                        <Typography variant="h4" >About</Typography>
                        <Grid container className={`${classes.custom}`}>
                            <Grid item xs={1} className={classes.flex3}>
                                <ContactsOutlinedIcon />
                            </Grid>
                            <Grid item xs={3} className={classes.flex3}>
                                <Typography variant="body1">Name</Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.flex4}>
                                <Typography variant="body1" >{wall?.info?.name ? wall.info.name : ''}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={`${classes.custom}`}>
                            <Grid item xs={1} className={classes.flex3}>
                                <MailOutlineOutlinedIcon />
                            </Grid>
                            <Grid item xs={3} className={classes.flex3}>
                                <Typography variant="body1">Email</Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.flex4}>
                                <Typography variant="body1" >{wall?.info?.email ? wall.info.email : ''}</Typography>
                            </Grid>
                        </Grid>
                        {
                            infoKeyValue.map((key, index) => {
                                return (
                                    <Grid container className={`${classes.custom}`} key={`${key}abc${index}`} style={{overflow: 'hidden'}}>
                                        <Grid item xs={1} className={classes.flex3}>
                                            {key.icon}
                                        </Grid>
                                        <Grid item xs={3} className={classes.flex3}>
                                            <Typography variant="body1">{key.key.charAt(0).toUpperCase() + key.key.slice(1)}</Typography>
                                        </Grid>
                                        <Grid item xs={8} className={classes.flex4} style={{overflow: 'hidden'}} >
                                            <Typography variant="body1" >{(typeof key.value === 'string' || key.value instanceof String) ? (key.value.charAt(0).toUpperCase() + key.value.slice(1)) : (Array.isArray(key.value) ? key.value.length: (key.value === true ? 'True': 'False'))}</Typography>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </div>
                </Grid>
                <Grid item className={`${classes.flex}`} md={9} xs={12} style={{ padding: '5px', maxHeight: '500px', overflow: 'hidden' }}>
                    <div className={classes.decor} style={{ color: '#304ffe' }}>
                        <Typography variant="h4">MEmories</Typography>
                        <Typography variant="subtitle2">You can only see his/her public, for-you-as-a-follower or for-you-as-a-friend MEmories</Typography>
                        <div style={{ maxHeight: '380px', overflowY: 'scroll', position: 'relative' }}>
                            <Posts id={id}/>
                    </div>
                        </div>
                </Grid>
            </Grid>
        </Grid>
    }

    const Node3 = () => {
        return (<div>
            {
                progress ? <FacebookProgress /> :
                    <div style={{ cursor: 'pointer' }} onClick={toggleFollowAction}>
                        <Typography variant="h6" style={{ display: 'inline', color: '#3f51b5' }}>Follow</Typography>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            {
                                follow ? <TurnedInIcon /> : <TurnedInNotIcon />
                            }
                        </IconButton></div>
            }
        </div>)
    }

    return <Container maxWidth="lg" style={{ padding: 0 }}>
        <div className={classes.rootAlert}>
            <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert variant="filled" severity={kindAlert}>{alertContent}</Alert>
            </Snackbar>
        </div>
        <CustomDialog open={open} setOpen={setOpen} node1={<Node1 />} node2={<Node2 />} node3={<Node3 />} />
    </Container>
}

export default Wall;