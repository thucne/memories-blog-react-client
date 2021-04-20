import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useDispatch } from 'react-redux';
import { updateInfo } from '../../actions/user';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        top: '0px',
        left: '0px',
        '&:hover': {
            opacity: 1,
        }
    },
    roott: {
        opacity: 0.5,
        backgroundColor: '#CCCCC1',
        '&:hover': {
            backgroundColor: 'blue',
            color: 'white'
        }

    },
    input: {
        display: 'none',
    },
}));

function Alert2(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MyButton({ setLinear }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setErrMsg('');
        setOpenErr(false);
    };

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file);
        setLinear(true);
        setLoading(true);
        dispatch(updateInfo({ avt: base64 })).then((result) => {
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
    return (
        <div>
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
                !loading &&
                <>
                    <TextField
                        id="originalFileName"
                        type="file"
                        inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
                        InputProps={{ style: { display: 'none' } }}
                        label={<IconButton color="primary" aria-label="upload picture" component="span" className={classes.roott}>
                            <PhotoCamera />
                        </IconButton>}
                        name="originalFileName"
                        onChange={handleFileRead}
                        size="small"
                        className={classes.root}
                    />

                </>
            }
        </div>
    );
}
