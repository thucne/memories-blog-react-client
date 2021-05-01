import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: 0,
    backgroundColor: '#009688',
    background: '#009688',
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#00695f',
      background: '#00695f',
    }
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    backgroundColor: 'none',
    background: 'none',
    color: 'gray',
    padding: 0,
    '&:hover': {
      color: '#4285F4',
      backgroundColor: '#e0e0e0',
      background: '#e0e0e0',
    }
  },
  snack: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  fileInput: {
    width: '97%',
    margin: '10px 0px 0px 10px',
    display: 'flex'
  },
}));