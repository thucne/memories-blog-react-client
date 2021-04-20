import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import Auth from '../Auth/Auth';
import { Container, Typography, Grid, Card, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import InputEdit from './InputEdit';
import IntroduceCard from './IntroduceCard';
import NewGGUser from './NewGGUser';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { updateInfo } from '../../actions/user';
import { useDispatch } from 'react-redux';

function Alert2(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MyInfo = ({ setLinear }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));
    const inititalState = { firstName: '', lastName: '', email: (user?.result?.email || '') };
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(inititalState);
    const userInfo = useSelector((state) => state.user);
    const [about, setAbout] = useState([]);
    const [keys, setKeys] = useState([]);
    const [formShow, setFormShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    if (!user) return <Auth />

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    if (userInfo?.info && !userInfo?.info?.message && about.length === 0 && keys.length === 0) {
        let temp = Object.keys(userInfo?.info);
        const indexOfV = temp.indexOf('__v');
        if (indexOfV > -1) {
            temp.splice(indexOfV, 1);
        }
        const indexOfInfo = temp.indexOf('info');

        if (indexOfInfo >-1) {
            temp.splice(indexOfInfo, 1);
        }
        console.log('keys ', temp);
        setKeys(temp);
        temp.forEach((key) => setAbout(old => [...old, userInfo?.info[key]]));
        console.log('about value', about);
    }

    const openForm = () => {
        setFormShow(true);
    }

    const handleSave = (e) => {
        e.preventDefault();
        console.log(formData);
        setLinear(true);
        setLoading(true);
        dispatch(updateInfo(formData))
            .then((result) => {
                setLinear(false); setLoading(false);
                if (result.message) {
                    setErrMsg(result.message);
                    setOpenErr(true);
                } else {
                setOpen(true);
                }
            })
            .catch((error) => {
                setLinear(false);
                setLoading(false);
                console.log(error.message);
                setErrMsg(error.message);
                setOpenErr(true);
            });
    }

    const handleClose = () => {
        setOpen(false);
        setErrMsg('');
        setOpenErr(false);
    };

    return (
        <Container style={{ margin: '10px 0px 10px 0px' }}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert2 onClose={handleClose} severity="success">
                    Update successfully!
                </Alert2>
            </Snackbar>
            <Snackbar open={openErr} autoHideDuration={2000} onClose={handleClose}>
                <Alert2 onClose={handleClose} severity="error">
                    {errMsg}
                </Alert2>
            </Snackbar>
            {
                formShow && <NewGGUser setErrMsg={setErrMsg} setOpenErr={setOpenErr} setLinear={setLinear} setOpen={setOpen} formShow={formShow} setFormShow={setFormShow} ggAvt={user?.result?.imageUrl || ''} ggFirstName={user?.result?.familyName || ''} ggLastName={user?.result?.givenName || ''} ggEmail={user?.result?.email || ''} ggId={user?.result?.googleId || ''} />
            }


            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                    <Card style={{ padding: '20px' }}>


                        <div style={{ color: '#3f51b5' }}>
                            <Typography variant='h4' component='h2'>
                                About
                            </Typography>
                            <Card style={{ padding: '10px', margin: '5px 5px 5px 5px', color: '#3f51b5', borderRadius: '20px' }}>
                                {
                                    userInfo?.info?.message ? (
                                        <div className={classes.myAlert}>
                                            <Alert severity="success" style={{ borderRadius: '20px', display: 'flex', overflow: 'auto' }}>
                                                <AlertTitle>
                                                    <strong>Name</strong>
                                                </AlertTitle>
                                                <Typography>
                                                    {user?.result?.name || user?.result?.username}
                                                </Typography>
                                            </Alert>
                                            <Alert severity="success" style={{ borderRadius: '20px', display: 'flex', overflow: 'auto' }}>
                                                <AlertTitle>
                                                    <strong>Email</strong>
                                                </AlertTitle>
                                                <Typography>
                                                    {user?.result?.email}
                                                </Typography>
                                            </Alert>

                                            <Alert severity="warning" style={{ borderRadius: '20px', display: 'flex', overflow: 'auto' }}>
                                                <AlertTitle>
                                                    <strong>Hello</strong>
                                                </AlertTitle>
                                                <Typography>
                                                    We detect that you are logging in with Google account and you do not have any MEmories account yet.
                                                    <br />
                                                    So we suggest that you create a linked account <Button className={classes.createGG} onClick={openForm}><strong>here</strong></Button>!
                                                </Typography>
                                            </Alert>
                                        </div>
                                    ) : (
                                        <Typography className={classes.myAlert}>
                                            {
                                                keys.map((key, index) => {
                                                    let value = about[index];
                                                    return (
                                                        <>
                                                            <Alert severity="success" style={{ borderRadius: '20px', display: 'flex', overflow: 'auto' }}>
                                                                <AlertTitle><strong>{key}</strong></AlertTitle>
                                                                <Typography>
                                                                    {value ? value : 'None'}
                                                                </Typography>
                                                            </Alert>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Typography>
                                    )
                                }
                            </Card>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Card style={{ padding: '10px' }} >
                        {
                            userInfo?.info?.message ? (
                                <div style={{ color: '#e91e63' }}>
                                    <IntroduceCard />
                                </div>
                            ) : (
                                <div style={{ color: '#e91e63' }}>
                                    <Typography variant='h4' component='h2' color='secondary' >
                                        Edit
                                    </Typography>
                                    {
                                        loading ? (<CircularProgress size={68} className={classes.fabProgress} />) : (
                                            <>
                                                <form autoComplete="off" onSubmit={handleSave}>
                                                    <InputEdit required name="email" label="Email Address" handleChange={handleChange} type="email" icon={<AlternateEmailIcon />} inValue={user?.result?.email || ''} />
                                                    <InputEdit required name="firstName" label="First Name" handleChange={handleChange} icon={<AssignmentIndIcon />} />
                                                    <InputEdit required name="lastName" label="Last Name" handleChange={handleChange} icon={<AssignmentIndIcon />} />
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="large"
                                                        className={classes.button}
                                                        startIcon={<SaveIcon />}
                                                        type="submit"
                                                    >
                                                        Save
                                                    </Button>
                                                </form>
                                            </>
                                        )
                                    }
                                </div>
                            )
                        }
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MyInfo;