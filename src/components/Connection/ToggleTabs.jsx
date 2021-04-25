import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        top: '-80px'
    },
    custom: {
        position: 'absolute !important',
        top: '120px',
        height: 'fit-content',
        all: 'initial'
    }
}));

export default function ToggleTabs({ tab, setTab }) {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };


    return (
        <div className={`${classes.root}`}>
            <AppBar position="static" color="default" style={{
                boxShadow: 'none', borderRadius: '10px'
            }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                    centered
                >
                    <Tab label="WALL" icon={<InfoOutlinedIcon />} {...a11yProps(0)} />
                    <Tab label="PHOTOS" icon={<PhotoLibraryOutlinedIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
        </div>
    );
}
