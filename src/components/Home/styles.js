import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  [theme.breakpoints.down('sm')]: {
    mainGrid: {
      flexDirection: 'column-reverse'
    }
  }
}));