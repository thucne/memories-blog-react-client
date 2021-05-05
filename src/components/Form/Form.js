import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, CircularProgress, MenuItem } from '@material-ui/core';
// import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import addNotification from 'react-push-notification';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import FormSnackBar from './FormSnackBar';
//Get the current ID
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import PublicIcon from '@material-ui/icons/Public';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { getPosts } from '../../actions/posts';

import Dialog from '@material-ui/core/Dialog';

const pushNoti = (title, subtitle, message) => {
    addNotification({
        title,
        subtitle,
        message,
        theme: 'darkblue',
        native: true // when using native, your OS will handle theming.
    });
}
/* <div className={classes.fileInput}>
           <FileBase
               type="file"
               required
               multiple={false}
               inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
               InputProps={{ style: { display: 'none' } }}
               onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
       </div> */
const Form = ({ currentId, setCurrentId, setLinear, setIsLoad, open2, setOpen2 }) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '', creatorAvt: (user?.result?.imageUrl || user?.result?.avt || ''), visibility: 'public' });
    const post = useSelector((state) => {
        return currentId ? state.posts.find((p) => { return p._id === currentId }) : null
    });
    const [progress, setProgress] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const isDone = useSelector((state) => { return state.posts });
    const [open, setOpen] = useState(false);
    const [snackMSG, setSnackMSG] = useState('');
    const [snackType, setSnackType] = useState('info');

    useEffect(() => {
        if (post) {
            setPostData(post);
        };
        if (isDone) {
            setProgress(false);
            setLinear(false);
        }
    }, [post, isDone, setLinear]);

    const submitData = () => {
        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }))
                .then((result) => {
                    setProgress(false);
                    setLinear(false);
                    if (setIsLoad) setIsLoad(false);
                    setOpen(true);
                    setSnackMSG('Post successfully and we love you!');
                    setSnackType('success');
                    pushNoti('Succesfully', 'You have just posted a MEmory!', 'What a wonderful day!');
                    clear();
                    if (setOpen2) setOpen2(false);
                }).catch((error) => {
                    setProgress(false);
                    setLinear(false);
                    setOpen(true);
                    setSnackMSG('Oops! Something went wrong, please try again! ^_^');
                    setSnackType('warning');
                    pushNoti('Oops', 'Something went wrong...!', 'Double check your action and try again please!');
                    if (setIsLoad) setIsLoad(false);
                    if (setOpen2) setOpen2(false);

                });
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
                .then((result) => {
                    setProgress(false);
                    setLinear(false);
                    if (setIsLoad) setIsLoad(false);
                    setOpen(true);
                    setSnackMSG('Update successfully and we have a crush on you!');
                    setSnackType('success');
                    pushNoti('Succesfully', 'You have just updated a MEmory!', 'What a wonderful day!');
                    clear();
                    getPosts();
                    if (setOpen2) setOpen2(false);

                }).catch((error) => {
                    setProgress(false);
                    setLinear(false);
                    setOpen(true);
                    setSnackMSG('Oops! Something went wrong, please try again! ^_^');
                    setSnackType('warning');
                    pushNoti('Oops', 'Something went wrong...!', 'Double check your action and try again please!');
                    if (setIsLoad) setIsLoad(false);
                    if (setOpen2) setOpen2(false);

                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setProgress(true);
        setLinear(true);
        if (setIsLoad) setIsLoad(true);
        console.log(postData);

        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA, { action: 'submit' }).then(token => {
                submitData();
            });
        });

    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    {/* Sign in to create public memories and like other's memories! */}
                    Welcome to the MEmories!
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '', creatorAvt: (user?.result?.imageUrl || user?.result?.avt || ''), visibility: 'public' })
    }

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file);
        setPostData({ ...postData, selectedFile: base64 })
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleClose2 = () => {
        if (setOpen2) setOpen2(false);
    }

    return (<>
        {
            !(open2 && setOpen2) ? <Paper className={classes.paper}>
                {
                    open && <FormSnackBar open={open} setOpen={setOpen} message={snackMSG} setMessage={setSnackMSG} type={snackType} setType={setSnackType} />
                }
                {
                    progress ? <CircularProgress /> : (
                        <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                            <Typography variant="h6">{currentId ? 'Editing' : 'Creating '} a Memory</Typography>
                            {/* <TextField name="creatorAvt" required type="hidden" variant="outlined" label="Title" fullWidth style={{display: 'none'}} value={user?.result?.imageUrl} onChange={(e) => setPostData({ ...postData, creatorAvt: e.target.value })} /> */}
                            <TextField name="title" required variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                            <TextField name="message" required variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                            <TextField name="tags" required variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                            <TextField
                                id="originalFileName2"
                                type="file"
                                inputProps={{ accept: 'image/*' }}
                                InputLabelProps={{ shrink: true, color: "primary" }}
                                label="Cover photo"
                                name="originalFileName"
                                onChange={handleFileRead}
                                size="small"
                                variant="outlined"
                                required={currentId === 0}
                                fullWidth
                            />
                            <FormControl variant="outlined" className={classes.formControl} required>
                                <InputLabel htmlFor={`outlined-age-native${currentId}${Date.now()}`}>Visibility</InputLabel>
                                <Select
                                    value={postData.visibility}
                                    onChange={(e) => setPostData({ ...postData, visibility: e.target.value })}
                                    label="Visibility"
                                    inputProps={{
                                        name: 'age',
                                        id: `outlined-age-native${currentId}${Date.now()}`,
                                    }}
                                    classes={{ root: classes.myOverride }}
                                >
                                    <MenuItem value={'public'} ><Button classes={{ root: classes.disableRipple }} startIcon={<PublicIcon />}>Public</Button></MenuItem>
                                    <MenuItem value={'followers'}><Button classes={{ root: classes.disableRipple }} startIcon={<SubscriptionsIcon />}>Followers</Button></MenuItem>
                                    {
                                        (process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?._id) > -1 || process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?.ggId) > -1 || process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?.googleId) > -1)
                                        && <MenuItem value={'oops'}><Button classes={{ root: classes.disableRipple }} startIcon={<CenterFocusWeakIcon />}>Oops</Button></MenuItem>
                                    }
                                    <MenuItem value={'onlyMe'}><Button classes={{ root: classes.disableRipple }} startIcon={<VisibilityOffIcon />}>Only me</Button></MenuItem>
                                </Select>
                            </FormControl>
                            <Button startIcon={<CloudUploadIcon />} className={`${classes.buttonSubmit} ${classes.uploadMemory}`} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                            <Button className={classes.clearMemory} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                        </form>
                    )
                }
            </Paper> : <Dialog onClose={handleClose2} aria-labelledby="simple-dialog-title" open={open2}>
                <Paper className={classes.paper}>
                    {
                        open && <FormSnackBar open={open} setOpen={setOpen} message={snackMSG} setMessage={setSnackMSG} type={snackType} setType={setSnackType} />
                    }
                    {
                        progress ? <CircularProgress /> : (
                            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                                <Typography variant="h6">{currentId ? 'Editing' : 'Creating '} a Memory</Typography>
                                {/* <TextField name="creatorAvt" required type="hidden" variant="outlined" label="Title" fullWidth style={{display: 'none'}} value={user?.result?.imageUrl} onChange={(e) => setPostData({ ...postData, creatorAvt: e.target.value })} /> */}
                                <TextField name="title" required variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                                <TextField name="message" required variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                                <TextField name="tags" required variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                                <TextField
                                    id="originalFileName2"
                                    type="file"
                                    inputProps={{ accept: 'image/*' }}
                                    InputLabelProps={{ shrink: true, color: "primary" }}
                                    label="Cover photo"
                                    name="originalFileName"
                                    onChange={handleFileRead}
                                    size="small"
                                    variant="outlined"
                                    required={currentId === 0}
                                    fullWidth
                                />
                                <FormControl variant="outlined" className={classes.formControl} required>
                                    <InputLabel htmlFor={`outlined-age-native${currentId}${Date.now()}`}>Visibility</InputLabel>
                                    <Select
                                        value={postData.visibility}
                                        onChange={(e) => setPostData({ ...postData, visibility: e.target.value })}
                                        label="Visibility"
                                        inputProps={{
                                            name: 'age',
                                            id: `outlined-age-native${currentId}${Date.now()}`,
                                        }}
                                        classes={{ root: classes.myOverride }}
                                    >
                                        <MenuItem value={'public'} ><Button classes={{ root: classes.disableRipple }} startIcon={<PublicIcon />}>Public</Button></MenuItem>
                                        <MenuItem value={'followers'}><Button classes={{ root: classes.disableRipple }} startIcon={<SubscriptionsIcon />}>Followers</Button></MenuItem>
                                        {
                                            (process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?._id) > -1 || process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?.ggId) > -1 || process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?.googleId) > -1)
                                            && <MenuItem value={'oops'}><Button classes={{ root: classes.disableRipple }} startIcon={<CenterFocusWeakIcon />}>Oops</Button></MenuItem>
                                        }
                                        <MenuItem value={'onlyMe'}><Button classes={{ root: classes.disableRipple }} startIcon={<VisibilityOffIcon />}>Only me</Button></MenuItem>
                                    </Select>
                                </FormControl>
                                <Button startIcon={<CloudUploadIcon />} className={`${classes.buttonSubmit} ${classes.uploadMemory}`} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                                <Button className={classes.clearMemory} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                            </form>
                        )
                    }
                </Paper>
            </Dialog>
        }
    </>
    );
}

export default Form;
