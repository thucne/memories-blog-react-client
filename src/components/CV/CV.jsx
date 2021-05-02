import { useEffect, useState } from 'react';
import { Container, Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import useStyles from './styles';

const CV = () => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    if (!user) { history.push('/auth') }

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 2000);
    })

    return <Container maxWidth='md' style={{ position: 'relative', zIndex: '1000', marginTop: '100px', padding: 0 }}>
        <MetaTags>
                    <title id='thuc1'>Katyperrycbt's CV</title>
                    <meta id='thuc2' name="title" content="Katyperrycbt's CV" />
                    <meta id='thuc3' name="description" content="This is a resume profile of Tran Trong Thuc!" />

                    <meta id='thuc4' property="og:type" content="website" />
                    <meta id='thuc5' property="og:url" content="https://oopsmemories.site/" />
                    <meta id='thuc6' property="og:title" content="CV on Facebook" />
                    <meta id='thuc7' property="og:description" content="This is a resume profile of Tran Trong Thuc!" />
                    <meta id='thuc8' property="og:image"
                        content="https://res.cloudinary.com/katyperrycbt/image/upload/v1619797100/CCV_kkl9lo.png" />

                </MetaTags>
        <Grid container spacing={3} alignItems='center' justify='center'>
            <Grid item xs={12} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                {
                    !open ? <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1619797119/ezgif.com-gif-maker_2_wqy4mk.gif' alt='cv' style={{ width: '100%', height: 'auto' }} />
                        : <iframe title='mycv' src="https://drive.google.com/file/d/1UAPvtAsREI5Za2u_jPfJXckejaMTxFSr/preview" className={classes.pdf}></iframe>

                    // <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1619797100/CCV_kkl9lo.png' alt='cv' style={{ width: '100%', height: 'auto' }} />
                }
            </Grid>
        </Grid>
    </Container>
}

export default CV;