import React, { useEffect } from 'react';
import { Container, Grow, Grid, Avatar, Typography } from '@material-ui/core';
import useStyles from './styles';
import InfoTabs from '../InfoTabs/InfoTabs';
import Badge from '@material-ui/core/Badge';
import MyButton from './MyButton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModalNotification from '../ModalNotification/ModalNotification';
import MetaTags from 'react-meta-tags';

const Info = (props) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const { setIsInfo, setLinear } = props;
    const history = useHistory();
    const noti = useSelector((state) => {
        if (state.noti.noti.length) {
            return state.noti.noti.filter((no) => no.link === '/info')
        }
        return [];
    });

    useEffect(() => {
        setIsInfo(true);
    })

    const httpToHTTPS = (str, from, what) => {
        if (str) {
            return str.substring(0, from) + what + str.substring(from);
        }
        return '';
    }

    if (!user) { history.push('/auth'); return <></> }

    return (
        <Grow in style={{ position: 'relative', marginTop: '90px' }}>
            <Container>
            <MetaTags>
                    <title id='thuc1'>MEmories</title>
                    <meta id='thuc2' name="title" content="MEmories" />
                    <meta id='thuc3' name="description" content="A small place for your MEmories!" />

                    <meta id='thuc4' property="og:type" content="website" />
                    <meta id='thuc5' property="og:url" content="https://oopsmemories.site/" />
                    <meta id='thuc6' property="og:title" content="MEmories [Facebook version]" />
                    <meta id='thuc7' property="og:description" content="A small place for your MEmories!" />
                    <meta id='thuc8' property="og:image"
                        content="https://res.cloudinary.com/katyperrycbt/image/upload/v1619876083/178838090_426441418795355_3180472797909818372_n_gypmjd.png" />

                </MetaTags>
                {
                    noti.length ? <ModalNotification noti={noti} /> : <></>
                }
                <Grid className={classes.mainGrid} container alignItems="center" spacing={3}>
                    <Grid container item xs={12} sm={12} md={12} style={{ justifyContent: "center", display: 'flex', flexDirection: 'row' }}>
                        <Badge
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            classes={{ badge: classes.badge }}
                            badgeContent={<MyButton setLinear={setLinear} />}
                        >
                            <Avatar alt={user?.result?.name} src={user?.result?.imageUrl || httpToHTTPS(user?.result?.avt, 4, 's') || ''} className={`${classes.large} ${classes.mainAvt}`} />
                        </Badge>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} style={{ justifyContent: "center", display: 'flex', flexDirection: 'row' }}>
                        <Typography className={classes.username} variant="h3" component="h2">
                            {user?.result?.name}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} style={{ justifyContent: "center", display: 'flex', flexDirection: 'row' }}>
                        <InfoTabs setLinear={setLinear} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}


export default Info;
