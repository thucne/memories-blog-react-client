import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Post from './Post/Post';
import useStyles from './styles'

const Posts = ({ setCurrentId, setLinear, searchKey }) => {
    const classes = useStyles();
    let posts = useSelector((state) => state.posts);

    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        user ? (
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
                        {posts.filter((post) => {
                            let str = '';
                            for (var prop in post) {
                                if (Object.prototype.hasOwnProperty.call(post, prop)) {
                                    str += ' ' + post[prop];
                                }
                            }
                            str = str.toLowerCase();
                            let isAllMatch = true;
                            for (let i = 0; i < searchKey.length; i++) {
                                if (str.indexOf(searchKey[i]) === -1) {
                                    isAllMatch = false;
                                    break;
                                }
                            }
                            return isAllMatch;

                        }).sort((a, b) => { return (new Date(b.createdAt) - new Date(a.createdAt)) }).map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={6}>
                                <Post post={post} setCurrentId={setCurrentId} setLinear={setLinear} />
                            </Grid>
                        ))}
                    </Grid>
                </>
        ) : (
            <>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    <Grid key={'123456'} item xs={12} sm={12} md={6}>
                        <Post post={
                            {
                                tags: ['TodayMood'],
                                likes: [],
                                title: 'Feeling goood!',
                                message: 'I tried new things today, it turned out not to be as terrible as I thought it would be...',
                                name: 'MEmories',
                                creator: '123456',
                                createdAt: '0000-03-07T09:45:48.790+00:00',
                                creatorAvt: 'https://res.cloudinary.com/katyperrycbt/image/upload/v1618987296/photo_fyxf36.png',
                                selectedFile: 'http://res.cloudinary.com/katyperrycbt/image/upload/v1616516477/w8gneu3s3mvqpollh8w0.jpg',
                                oops: false,
                                modified: false,
                                __v: 0,
                                _id: '123456789'
                            }} setCurrentId={'setCurrentId'} setLinear={setLinear} />
                    </Grid>
                </Grid>
            </>
        )
    );
}

export default Posts;
