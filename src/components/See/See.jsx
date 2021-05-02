import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { see } from '../../actions/wall';
import Post from '../Posts/Post/Post';

import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';

import useStyles from './styles';

import { Container, Grid } from '@material-ui/core';


const See = ({ setLinear }) => {
    const found = useSelector((state) => state.see.see);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    let { id } = useParams();

    useEffect(() => {
        if (!found) {
            if (user) {
                dispatch(see(id, user?.result?._id));
            } else {
                dispatch(see(id))
            }
        }
    });

    return <Container maxWidth='sm' style={{ padding: 0, position: 'relative', top: '100px' }}>
        {
            !found ? <Card style={{ borderRadius: '20px' }}>
                <CardHeader
                    avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
                    action={null}
                    title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
                    subheader={<Skeleton animation="wave" height={10} width="40%" />}
                />
                <Skeleton animation="wave" variant="rect" className={classes.media} />
                <LinearProgress />
                <CardContent>
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                </CardContent>
            </Card> : <Grid
                container
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                spacing={1}
            >
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Post post={found} setLinear={setLinear} setOpenForm={undefined}></Post>
                </Grid>
            </Grid>
        }
    </Container>;
}

export default See;
