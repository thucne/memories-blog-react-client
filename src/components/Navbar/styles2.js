import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        color: theme.palette.common.white,
        textDecoration: 'none',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        '&:focus': {
            [theme.breakpoints.up('md')]: {
                width: '50ch',
            }
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    image: {
        margin: '1px 1px 1px 10px',
        height: '50px'
    },
    baddd: {
        top: '-10px',
        left: '-10px'
    },
    username: {
        color: theme.palette.common.white,
        textDecoration: 'none',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    purple: {
        color: theme.palette.common.white,
        textDecoration: 'none',
        display: 'block',
        margin: 'auto 5px auto 5px',
        [theme.breakpoints.down('sm')]: {
            margin: 'auto 0px auto 5px',
        },
    },
    [theme.breakpoints.down('sm')]: {
        mainGrid: {
            flexDirection: 'column-reverse',
        },
        image: {
            height: '45px'
        },
    },
    [theme.breakpoints.down('xs')]: {
        mainGrid: {
            flexDirection: 'column-reverse',
        },
        image: {
            margin: '1px 10px 1px -20px',
            height: '35px'
        },
    }
}));