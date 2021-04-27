import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
        mainGrid: {
            flexDirection: 'column-reverse'
        }
    }
}));