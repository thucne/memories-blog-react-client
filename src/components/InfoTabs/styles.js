import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        background: 'rgba(197, 202, 233, 0.63)',
        borderRadius: '5px',
        
    },
    button: {
        background: 'linear-gradient(45deg, #2AB929 30%, #71F337 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        margin: '10px 10px 10px 10px'
    },
    infoEdit: {
        display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // justifyItems: 'center',
        // maxWidth: '100%',
        overflow: 'auto'
    },
    myAlert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    createGG: {
        padding: '0px',
        '&:hover': {
            background: 'linear-gradient(45deg, #2AB929 30%, #71F337 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            color: 'white'
        }
    },
    fileInput: {
        width: '97%',
        margin: '10px 0px 0px 10px',
        display: 'flex'
    },
    inputBorder: {
        border: '1px solid green'
    },
    [theme.breakpoints.down('sm')]: {
        root: {
            // flexDirection: 'column-reverse'
        },
        mainGrid: {
            flexDirection: 'column-reverse'
        }
    }
}));