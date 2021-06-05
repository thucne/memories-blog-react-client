import { useEffect, useState } from 'react';
import { Container, Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

// import useStyles from './styles';

const CV = () => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    // const classes = useStyles();
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
            {/* <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {
                    !open ? <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1619797119/ezgif.com-gif-maker_2_wqy4mk.gif' alt='cv' style={{ width: '100%', height: 'auto' }} />
                        : <iframe title='mycv' src="https://drive.google.com/file/d/1UAPvtAsREI5Za2u_jPfJXckejaMTxFSr/preview" className={classes.pdf}></iframe>

                    // <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1619797100/CCV_kkl9lo.png' alt='cv' style={{ width: '100%', height: 'auto' }} />
                }
            </Grid> */}
            <Grid item xs={12} >

                <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1619797119/ezgif.com-gif-maker_2_wqy4mk.gif' alt='cv' style={{ width: '100%', height: 'auto', display: !open ? '': 'none' }} />
                <div style={{display: open ? '': 'none'}}>
                    <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '141.4286%', paddingBottom: '48px', boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: '8px', willChange: 'transform' }}>
                        <iframe title="ssdoiswq" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }} src="https://www.canva.com/design/DAEdIJhptxU/view?embed">
                        </iframe>
                    </div>
                    <a href="https://www.canva.com/design/DAEdIJhptxU/view?utm_content=DAEdIJhptxU&utm_campaign=designshare&utm_medium=embeds&utm_source=link" target="_blank" rel="noreferrer">Official CV</a> by Trong Thuc Tran
                </div>

                {/* <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1619797100/CCV_kkl9lo.png' alt='cv' style={{ width: '100%', height: 'auto' }} /> */}

            </Grid>
        </Grid>
    </Container>
}

export default CV;