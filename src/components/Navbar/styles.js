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
    height: '50px'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 'fit-content',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'fit-content',
  },
  userName: {
    display: 'block',
    alignItems: 'center',
    margin: '2px 15px 2px 2px'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    display: 'flex',
    alignItems: 'center',
    postion: 'inherit',
    verticalAlign: 'center',
    // top: '15px',
    marginRight: '10px',
  },
  chatting: {
    // backgroundColor: 'blue',
    // alignItems: 'center',
    // margin: '2px 2px 2px 2px'
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    display: 'flex',
  },
  seeInfo: {
    background: 'linear-gradient(45deg, #2AB929 30%, #71F337 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    display: 'flex',
  },
  logout: {
    background: 'linear-gradient(45deg, #F50F5F 30%, #F287B4 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    display: 'flex',
  },
  mailGun: {
    background: 'linear-gradient(45deg, #97970F 30%, #F1F169 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    display: 'flex',
  },
  reload: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    backgroundColor: 'yellow',
    zIndex: 5000,
    opacity: 0.7
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
    },
    purple: {
      top: '5px',
    },
    image: {
      height: '40px'
    },
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
    },
    image: {
      height: '30px'
    },
  }
}));