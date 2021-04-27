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
  whatisinyourmind: {
    width: '100%', backgroundColor: 'rgba(216, 216, 216, 0.3)', borderRadius: '20px',
    '&:hover': {
      filter: 'brightness(80%)',
      backgroundColor: 'rgba(216, 216, 216, 0.3)',
      // color: 'white'
    }
  },
  white: {
    color: '#3f51b5',
    '&:hover': {
      color: '#f44336'
    }
  }
  // [theme.breakpoints.down('sm')]: {
  //   mainGrid: {
  //     flexDirection: 'column-reverse'
  //   }
  // },
}));