import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import useStyles from './styles';

const Reload = () => {
    const classes  = useStyles();

    return (
        <IconButton className={classes.reload} color="primary" aria-label="upload picture" component="span" onClick={() => window.location.reload()}>
            <ReplayIcon style={{color: 'red'}} />
        </IconButton>
    )
}

export default Reload;