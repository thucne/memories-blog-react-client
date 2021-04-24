import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';

import { getWall } from '../../actions/wall';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CustomDialog from './CustomDialog';
import { Container, Grid, Avatar, Typography, Button } from '@material-ui/core';

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

    const [kindAlert, setKindAlert] = useState('success');
    const [alertContent, setAlertContent] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    console.log(wall);

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
            <Grid item className={classes.flex} >

            </Grid>
        </Grid>
    }

    const Node3 = () => {
        return <Button>Test</Button>
    }

    return <Container maxWidth="lg">
        <div className={classes.rootAlert}>
            <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert variant="filled" severity={kindAlert}>{alertContent}</Alert>
            </Snackbar>
        </div>
        <CustomDialog open={open} setOpen={setOpen} node1={<Node1 />} node2={<Node2 />} node3={<Node3 />} />
    </Container>
}

export default Wall;