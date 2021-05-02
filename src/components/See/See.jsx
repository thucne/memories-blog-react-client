import React, { useEffect, useState } from 'react';
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

import { Container, Grid, Typography } from '@material-ui/core';

import MetaTags from 'react-meta-tags';

const See = ({ setLinear }) => {
    const found = useSelector((state) => state.see.see);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [done, setDone] = useState(false);
    const [msg, setMsg] = useState('');

    let { id } = useParams();

    useEffect(() => {
        if (!found && !done) {
            if (user) {
                dispatch(see(id, user?.result?._id)).then((result) => {
                    setDone(true);
                    if (result.message) setMsg(result.message);
                }).catch((err) => {
                    setDone(true);
                    if (err.message) setMsg(err.message);

                });
            } else {
                dispatch(see(id)).then((result) => {
                    setDone(true);
                    if (result.message) setMsg(result.message);
                }).catch((err) => {
                    setDone(true);
                    if (err.message) setMsg(err.message);
                });
            }
        }
    });

    const httpToHTTPS = (str, from, what) => {
        if (str) {
            return str.substring(0, from) + what + str.substring(from);
        }
        return '';
    }

    return <Container maxWidth='sm' style={{ padding: 0, position: 'relative', top: '100px' }}>
        <MetaTags>
            <title id='thuc1'>{(!found && !done) ? 'MEmory not found' : ((!found && done) ? 'Bad request to MEmories' : found.title)}</title>
            <meta id='thuc2' name="title" content={(!found && !done) ? 'MEmory not found' : ((!found && done) ? 'Bad request to MEmories' : found.title)} />
            <meta id='thuc3' name="description" content={(!found && !done) ? 'Ec ec' : ((!found && done) ? msg : `MEmory of ${found.name}`)} />

            <meta id='thuc4' property="og:type" content="website" />
            <meta id='thuc5' property="og:url" content={`https://oopsmemories.site/see/${id}`} />
            <meta id='thuc6' property="og:title" content={(!found && !done) ? 'MEmory not found' : ((!found && done) ? 'Bad request to MEmories' : found.title)} />
            <meta id='thuc7' property="og:description" content={(!found && !done) ? 'Ec ec' : ((!found && done) ? msg : `MEmory of ${found.name}`)} />
            <meta id='thuc8' property="og:image"
                content={(!found && !done) ? "https://res.cloudinary.com/katyperrycbt/image/upload/v1619876083/178838090_426441418795355_3180472797909818372_n_gypmjd.png" : ((!found && done) ? "https://res.cloudinary.com/katyperrycbt/image/upload/v1619876083/178838090_426441418795355_3180472797909818372_n_gypmjd.png" : httpToHTTPS(found.selectedFile, 4, 's'))} />

        </MetaTags>

        {
            !found && !done ? <Card style={{ borderRadius: '20px' }}>
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
            </Card> : (
                !found && done ? <Typography variant='h3' style={{ color: '#ffffff', background: '#3d5afe', padding: '10px 10px 10px 10px', borderRadius: '10px' }}>
                    {msg}
                </Typography> :
                    <Grid
                        container
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center' }}
                        spacing={1}
                    >
                        <Grid item xs={12} md={12} sm={12} lg={12}>
                            <Post post={found} setLinear={setLinear} setOpenForm={undefined}></Post>
                        </Grid>
                    </Grid>)
        }
    </Container>;
}

export default See;
