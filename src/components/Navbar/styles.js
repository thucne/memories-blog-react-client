import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',     
    padding: '10px 50px',
    maxWidth: '100%',
    maxHeight: 'fit-content',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
    // display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
    },
    profile: {
      display: 'block',
    },
    userName: {
      display: 'flex',
    },
    brandContainer: {
      display: 'flex',
    }
  },
  [theme.breakpoints.down('xs')]: {
    appBar: {
      display: 'block',
    },
    toolbar: {
      display: 'block',
    },
    profile: {
      display: 'block',
    },
    userName: {
      display: 'block',
    },
    brandContainer: {
      display: 'block',
    }

  },
}));