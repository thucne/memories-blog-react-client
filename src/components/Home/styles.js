import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  [theme.breakpoints.down('xs')]: {
    mainGrid: {
      flexDirection: 'column-reverse'
    }
  }
}));