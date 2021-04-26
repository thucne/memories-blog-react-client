import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';
import { getAVTs } from '../../actions/getAVTs';
import { getComments } from '../../actions/posts';
import { getInfo } from '../../actions/user';
import ModalNotification from '../ModalNotification/ModalNotification';

import useStyles from './styles';

const Home = (props) => {
    const [currentId, setCurrentId] = useState(0);
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
        dispatch(getInfo());
        dispatch(getPosts());
        dispatch(getAVTs());
        dispatch(getComments());
    }, [dispatch, setLinear]);


    return (
        <Grow in={true}>
            <Container>
                {
                    noti.length ? <ModalNotification noti={noti} /> : <></>
                }
                <Grid className={classes.mainGrid} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={12} md={7}>
                        <Posts setCurrentId={setCurrentId} setLinear={setLinear} searchKey={searchKey} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} setLinear={setLinear} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;