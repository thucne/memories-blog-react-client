// import { ReactComponent as YourSvg } from './cv.svg';
import { useEffect, useState } from 'react';
import { Container, Grid } from "@material-ui/core";

const CV = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 2000);
    })

    return <Container maxWidth='md' style={{ position: 'relative', zIndex: '1000000000000000', marginTop: '100px', padding: 0 }}>
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