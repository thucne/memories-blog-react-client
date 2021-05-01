import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, Avatar, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';
import { getAVTs } from '../../actions/getAVTs';
import { getComments } from '../../actions/posts';
import { getInfo } from '../../actions/user';
import ModalNotification from '../ModalNotification/ModalNotification';
import MetaTags from 'react-meta-tags';
import { ReactTitle } from 'react-meta-tags';

import useStyles from './styles';

const Home = (props) => {
    const [currentId, setCurrentId] = useState(0);
    const [formDialog, setFormDialog] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    const classes = useStyles();
    const { setLinear, searchKey } = props;
    const noti = useSelector((state) => {
        if (state.noti.noti.length) {
            return state.noti.noti.filter((no) => no.link === '/')
        }
        return [];
    });
    useEffect(() => {
        setLinear(true);
        dispatch(getInfo()).then(() => { setLinear(false) }).catch(() => { setLinear(false) });
        dispatch(getPosts()).then(() => { setLinear(false) }).catch(() => { setLinear(false) });
        dispatch(getAVTs()).then(() => { setLinear(false) }).catch(() => { setLinear(false) });
        dispatch(getComments()).then(() => { setLinear(false) }).catch(() => { setLinear(false) });
    }, [dispatch, setLinear]);

    const httpToHTTPS = (str, from, what) => {
        if (str) {
            return str.substring(0, from) + what + str.substring(from);
        }
        return '';
    }

    const handleClick = () => {
        setFormDialog((state) => !state);
    }

    return (
        <Grow in={true} style={{ position: 'relative', marginTop: '90px' }}>
            <Container style={{ padding: 0 }} classes={{ root: classes.toggle }}>
                <ReactTitle title='MEmories / Home' />
                <MetaTags>
                    {/* <meta property="og:image"
                        content="https://res.cloudinary.com/katyperrycbt/image/upload/v1619797100/CCV_kkl9lo.png" /> */}

                </MetaTags>
                {
                    noti.length ? <ModalNotification noti={noti} /> : <></>
                }
                {
                    formDialog && <Form currentId={currentId} setCurrentId={setCurrentId} setLinear={setLinear} open2={formDialog} setOpen2={setFormDialog} />
                }
                <Grid className={classes.mainGrid} container justify="space-between" alignItems="stretch" spacing={3}>
                    {
                        user ?
                            <Grid container spacing={0} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifiContent: 'center', alignItems: 'stretch', padding: '10px', backgroundColor: 'white', borderRadius: '8px', margin: '5px 10px 5px 10px' }}>
                                <Grid item xs={2} className={classes.flex}>
                                    <Avatar src={user?.result?.avt ? httpToHTTPS(user.result.avt, 4, 's') : (user?.result?.imageUrl ? user.result.imageUrl : '')} />
                                </Grid>
                                <Grid item xs={10} className={classes.flex}>
                                    <Button onClick={handleClick} classes={{ label: classes.white }} className={classes.whatisinyourmind}>{user?.result?.name ? `Hey ${user?.result?.name}, what's in your mind?` : `Hey there, what'is in your mind?`}</Button>
                                </Grid>
                            </Grid>
                            :
                            <Grid container spacing={0} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifiContent: 'center', alignItems: 'center', padding: '10px', backgroundColor: 'lightgray', borderRadius: '8px', margin: '5px 10px 5px 10px' }}>
                                <Typography>Hello, Welcome to MEmories!</Typography>
                            </Grid>
                    }
                    <Grid item xs={12} sm={12} md={12}>
                        <Posts setCurrentId={setCurrentId} setLinear={setLinear} searchKey={searchKey} setOpenForm={setFormDialog} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;