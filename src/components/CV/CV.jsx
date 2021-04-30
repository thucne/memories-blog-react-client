import { useEffect, useState } from 'react';
import { Container, Grid } from "@material-ui/core";
import MetaTags from 'react-meta-tags';

const CV = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 2000);
    })

    return <Container maxWidth='md' style={{ position: 'relative', zIndex: '1000000000000000', marginTop: '100px', padding: 0 }}>
        <MetaTags>
            <meta charset="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/photos.favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />

            <title>MEmories</title>
            <meta name="title" content="MEmories by katyperrycbt" />
            <meta name="description"
                content="A place to post your MEmories!" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.oopsmemories.site/" />
            <meta property="og:title" content="MEmories for Facebook Custom" />
            <meta property="og:description"
                content="A place to post your MEmories!" />
            <meta property="og:image"
                content="https://res.cloudinary.com/katyperrycbt/image/upload/v1615297494/Web_capture_5-3-2021_145319_memories-thuckaty.netlify.app_hrcwg6.jpg" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://www.oopsmemories.site/" />
            <meta property="twitter:title" content="MEmories for Twitter" />
            <meta property="twitter:description"
                content="A place to post your MEmories!" />
            <meta property="twitter:image"
                content="https://res.cloudinary.com/katyperrycbt/image/upload/v1615297494/Web_capture_5-3-2021_145319_memories-thuckaty.netlify.app_hrcwg6.jpg" />


            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        </MetaTags>
        <Grid container spacing={3} alignItems='center' justify='center'>
            <Grid item xs={12}>
                {
                    !open ? <img src='cvv.gif' alt='cv' style={{ width: '100%', height: 'auto' }} />
                        : <img src='cv.png' alt='cv' style={{ width: '100%', height: 'auto' }} />
                }
            </Grid>
        </Grid>
    </Container>
}

export default CV;