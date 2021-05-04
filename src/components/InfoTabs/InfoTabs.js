import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, Paper } from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import MyPost from './MyPosts';
import MyInfo from './MyInfo';
import ChangePassword from './ChangePassword';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CachedIcon from '@material-ui/icons/Cached';


import { useDispatch } from 'react-redux';

import { getInfo } from '../../actions/user';
import { resetPosts } from '../../actions/posts';

const InfoTabs = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const [currentId, setCurrentId] = useState(0);

    const { setLinear } = props;

    const clickInfo = () => {
        setLinear(true);
        dispatch(getInfo()).then((result) => {
            setLinear(false);
        }).catch((error) => {
            setLinear(false);
        })
    }

    const updatePost = () => {
        console.log('update post CLICKED!');
        setLinear(true);
        dispatch(resetPosts()).then((result) => {
            setLinear(false);
        }).catch((error) => {
            setLinear(false);
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log('tab', value);
    };

    return (
        <Container maxWidth='md'>
            <Paper className={classes.root} elevation={0}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"        
                    style={{ background: 'white', borderRadius: '10px' }}
                >
                    <Tab label="Your memories" icon={<LibraryBooksIcon />} />
                    <Tab label="Edit your info" icon={<EditIcon />} onClick={clickInfo} />
                    <Tab label="Change password" icon={<VpnKeyIcon />} onClick={clickInfo} />
                    <Tab label="Update your posts" icon={<CachedIcon />} onClick={updatePost} />
                </Tabs>
                {
                    value === 0 ?
                        <MyPost setLinear={setLinear} currentId={currentId} setCurrentId={setCurrentId} /> :
                        (value === 1 ? <MyInfo setLinear={setLinear} /> : (value === 2 ? <ChangePassword setLinear={setLinear} /> : <MyPost setLinear={setLinear} currentId={currentId} setCurrentId={setCurrentId} />))
                }
            </Paper>
        </Container>
    );
}

export default InfoTabs;