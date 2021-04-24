import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    rootAlert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    fullWidthFlexCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    fullWidthFlexStretch: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    background: {
        width: 'auto',
        height: 'auto',
        top: '-20px'
    },
    coverbackground: {
        position: 'relative',
        width: '100%',
        height: '100px',
        overflow: 'hidden'
    },
    avatar: {
        display: 'flex',
        position: 'relative',
        top: '-45px',
        justifyContent: 'center',
        alignItems: 'center',
        width: theme.spacing(10),
        height: theme.spacing(10)
    }
}));