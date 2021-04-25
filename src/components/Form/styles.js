import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  uploadMemory: {
    background: 'linear-gradient(45deg, #5451E5 30%, #51B9E5 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  },
  clearMemory: {
    background: 'linear-gradient(45deg, #AE2990 30%, #E965F9 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  },
  root2: {
    top: '0px',
    left: '0px',
    '&:hover': {
      opacity: 1,
    }
  },
  roott: {
    opacity: 0.5,
    backgroundColor: '#CCCCC1',
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white'
    }

  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
}));