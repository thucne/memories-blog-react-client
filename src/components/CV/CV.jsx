import { useEffect, useState } from 'react';
import { Container, Grid } from "@material-ui/core";
import MetaTags from 'react-meta-tags';
import { ReactTitle } from 'react-meta-tags';
import { useHistory } from 'react-router-dom';

const CV = () => {
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));

    if (!user) { history.push('/auth') }

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 2000);
    })

    return <Container maxWidth='md' style={{ position: 'relative', zIndex: '1000', marginTop: '100px', padding: 0 }}>
        <ReactTitle title="Katyperrycbt's CV" />
        <MetaTags>

            <meta name="description"
                content="Katyperrycbt's CV!" />
            <meta property="og:url" content="https://www.oopsmemories.site/katyperrycbt" />
            <meta property="og:title" content="Katyperrycbt's CV" />
            <meta property="og:description"
                content="Please review!" />
            <meta property="og:image"
                content="https://res.cloudinary.com/katyperrycbt/image/upload/v1619797100/CCV_kkl9lo.png" />

        </MetaTags>
        <Grid container spacing={3} alignItems='center' justify='center'>
            <Grid item xs={12}>
                {
                    !open ? <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1619797119/ezgif.com-gif-maker_2_wqy4mk.gif' alt='cv' style={{ width: '100%', height: 'auto' }} />
                        : <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1619797100/CCV_kkl9lo.png' alt='cv' style={{ width: '100%', height: 'auto' }} />
                }
            </Grid>
        </Grid>
    </Container>
}

export default CV;