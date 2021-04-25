import React from 'react';
import { Grid, LinearProgress, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Post from './Post';
import useStyles from './styles'

const Posts = ({ id }) => {
    const classes = useStyles();
    const raw = useSelector((state) => state.posts);

    let posts = [];

    if (!posts.length) {
        if (raw) {
            for (let i = 0; i < raw.length; i++) {
  
                if (raw[i]['creator'] === id) posts.push(raw[i]);
            }
        }
    }

    return (

        !posts.length ?
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
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {posts.sort((a, b) => { return (new Date(b.createdAt) - new Date(a.createdAt)) }).map((post) => (
                        <Grid key={`${post._id}sdaszxqqq`} item xs={12} sm={6} md={4}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            </>
    )
}

export default Posts;