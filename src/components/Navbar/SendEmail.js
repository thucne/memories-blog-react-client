import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import mailgun from 'mailgun-js';
import InputEdit from '../InfoTabs/InputEdit';
import dotenv from 'dotenv';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

dotenv.config();

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const SendEmail = ({ open, setOpen, setLinear }) => {
    const classes = useStyles();
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const user = JSON.parse(localStorage.getItem('profile'));

    const [emailData, setEmailData] = useState({
        from: 'MEmories <no-reply@oopsmemories.site>',
        to: '',
        subject: `[MEmories Promo] You got an invitation`,
        html: `
        <h3>Hi!</h3>

        You have an invitation to use the <a href="https://www.oopsmemories.site/">MEmories</a> social media from your friend ${user.result.name} [${user.result.email}].
        <br/>
        We are looking forward to seeing you again!

        `
    })

    const handleClose = () => {
        setOpen(false);
    };

    const footer = `
    <br/><br/>
    Best regards,
    <strong>MEmories Team</strong>
    <br/><br/><br/>
    <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1615297494/Web_capture_5-3-2021_145319_memories-thuckaty.netlify.app_hrcwg6.jpg' alt='MEmories' />
    <p style="font-size: 0.875em; align-items: center; justify-content: center; display: flex; color: gray;">MEmories Team, Quarter-6, Linh Trung Ward, Thu Duc District, Thu Duc City, Vietnam 70000.</p>
    <br/>
    <p style="font-size: 0.875em; align-items: center; justify-content: center; display: flex; color: gray;">Contact: katyperrycbt@gmail.com</p>
    `

    const handleChange = (e) => {
        setEmailData({ ...emailData, [e.target.name]: e.target.value });
    }

    const sendMail = () => {
        setLinear(true);
        const mg = mailgun({ apiKey: process.env.REACT_APP_MAILGUN, domain: process.env.REACT_APP_MAILGUN_URL });
        const data = emailData;
        mg.messages().send({...data, html: data.html + footer}, function (error, body) {
            console.log(body);
            setSuccess(true);
            setLoading(false);
            setLinear(false);
        });
    }

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });


    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            sendMail();
        }
    };


    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Send mail</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To invite a friend, please type his/her email here!
                    </DialogContentText>
                    <InputEdit required name="to" type="text" label="To (comma separated)" handleChange={handleChange} />
                    {
                        process.env.REACT_APP_THUC_KATY === user?.result?.email &&
                        (
                            <>
                                <InputEdit required name="subject" type="text" label="Subject" handleChange={handleChange} />
                                <InputEdit required name="html" type="text" label="Content" multiline rows={10} handleChange={handleChange} />
                            </>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <div className={classes.root}>
                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={buttonClassname}
                                disabled={loading}
                                onClick={handleButtonClick}
                            >
                                Send
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SendEmail;