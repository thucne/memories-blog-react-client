import React, { useEffect, useState } from 'react';
import { Grid, LinearProgress, Container, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Post from '../Posts/Post/Post';
import Auth from '../Auth/Auth';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Form from '../Form/Form';
import { getInfo } from '../../actions/user';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const MyPost = ({ setLinear, currentId, setCurrentId }) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setLinear(true);
        dispatch(getInfo())
            .then(() => {
                dispatch(getPosts())
                    .then((result) => {
                        setLinear(false);
                    })
                    .catch((error) => {
                        setLinear(false);
                    });

            })
            .catch(() => setLinear(false));

    }, [dispatch, setLinear]);

    let posts = useSelector((state) => state.posts);

    posts = useSelector((state) => {
        let posts = [];
        for (let i = 0; i < state.posts.length; i++) {
            if ((state.posts[i].creator === user?.result?.googleId) || (state.posts[i].creator === user?.result?._id) || (state.posts[i].creator === user?.result?.ggId)) {
                posts.push(state.posts[i]);
            }
        }
        return posts;
    });

    if (!user) return <Auth />

    return (
        !posts ?
            <Card className={classes.card} style={{ borderRadius: '20px' }}>
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
            </Card> :
            <>
                <Container style={{ margin: '10px 0px 10px 0px' }}>
                    <Grid className={classes.mainGrid} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={12} md={12} >
                            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                <Grid item xs={12} sm={6} md={4}>
                                    {
                                        isLoad ? <CircularProgress color="secondary" /> : <Form currentId={currentId} setCurrentId={setCurrentId} setLinear={setLinear} setIsLoad={setIsLoad} />
                                    }
                                </Grid>
                                {posts.sort((a, b) => { return (new Date(b.createdAt) - new Date(a.createdAt)) }).map((post) => (
                                    <Grid key={post._id} item xs={12} sm={6} md={4}>
                                        <Post post={post} setCurrentId={setCurrentId} />
                                    </Grid>
                                ))}
                                {
                                    posts.length === 0 && <Grid key={'123456a'} item xs={6} sm={4} md={4}>
                                    <Post post={
                                        {
                                            tags: ['MEmories'],
                                            likes: [],
                                            title: 'No Data!',
                                            message: 'Oops! You have no post. Try to create the first one',
                                            name: 'MEmories',
                                            creator: '123456',
                                            createdAt: '0000-03-07T09:45:48.790+00:00',
                                            creatorAvt: 'http://res.cloudinary.com/katyperrycbt/image/upload/v1618987296/photo_fyxf36.png',
                                            selectedFile: 'http://res.cloudinary.com/katyperrycbt/image/upload/v1619163349/logo_knvpam.png',
                                            oops: false,
                                            modified: false,
                                            __v: 0,
                                            _id: '123456789'
                                        }} setCurrentId={'setCurrentId'} setLinear={setLinear} />
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </>
    )
}

export default MyPost;