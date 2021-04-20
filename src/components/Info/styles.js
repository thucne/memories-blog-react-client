import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainGrid: {
    // backgroundColor: 'white',
    borderRadius: '10px'
  },
  mainAvt: {
    width: '200px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid pink'
  },
  badge: {
    right: '30%',
    top: '60%',
  },
  username: {
    display: 'block',
    alignItems: 'center',
    margin: '2px 15px 2px 2px',
    color: 'pink',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    padding: '0px 8px 0px 8px',
    borderRadius: '10px'
  },
  [theme.breakpoints.down('sm')]: {
    badge: {
      right: '32%',
      top: '45%',
    },
    mainGrid: {
      // flexDirection: 'column-reverse'
    },
    mainAvt: {
      width: '150px',
      height: '150px'
    }
  }
}));