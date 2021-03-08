import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({

    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        display: 'flex',
        alignItems: 'center',
        postion: 'inherit',
        top: '15px',
        marginRight: '10px'
    },

    [theme.breakpoints.down('sm')]: {

        purple: {
            top: '5px',
        }
    },
    [theme.breakpoints.down('xs')]: {

    },
}));