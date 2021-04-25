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
    fullWidthFlexStretch2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: 0
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    flex2: {
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: '',
        flexDirection: 'column',
        width: '100%'
    },
    flex3: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        // padding: '10px 5px 10px 5px'
    },
    flex3Row: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        // padding: '10px 5px 10px 5px'
    },
    flex4: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        // padding: '10px 5px 10px 0px'
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
        height: '150px',
        overflow: 'hidden'
    },
    avatar: {
        display: 'flex',
        position: 'relative',
        top: '-85px',
        justifyContent: 'center',
        alignItems: 'center',
        width: theme.spacing(20),
        height: theme.spacing(20)
    },
    custom: {
        postion: 'relative',
        top: '-10px',
    },
    align: {
        position: 'relative',
        top: '-65px'
    },
    decor: {
        backgroundColor: '#bbdefb',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        padding: '10px 20px 10px 20px',
        position: 'inherit'
    },
    decor2: {
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        padding: '10px 20px 10px 20px',
        position: 'inherit'
    },
    dialog: {
        borderRadius: '20px',
    },
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: 'center',
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
    },
    media: {
        height: 190,
    },
}));