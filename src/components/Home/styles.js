import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toggle: {
    maxWidth: '600px'
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  [theme.breakpoints.down('sm')]: {
    mainGrid: {
      flexDirection: 'column-reverse'
    }
  },
}));