import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    pdf: {
        width: '100%',
        height: '842px'
    },
    [theme.breakpoints.down('md')]: {
        pdf: {
            height: '90vh'
        },
    },
    [theme.breakpoints.down('xs')]: {
        pdf: {
            height: '60vh'
        }
    }
}));