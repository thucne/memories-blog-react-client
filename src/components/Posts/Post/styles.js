import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cardSke: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  mediaSke: {
    height: 190,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  card2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px',
    // border: '1px dotted blue',
    height: '100%',
    position: 'relative',
    margin: '0px 5px 5px 5px',
    zIndex: '100',
  },
  cardOops: {
    border: '1px solid #dc004e',
    // background: 'linear-gradient(45deg, #EEC5E1 100%, #E551B6 30%)',
  },
  cardNotOops: {
    border: '1px solid gray'
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  overlay3: {
    position: 'absolute',
    top: '135px',
    left: '-5px',
    color: 'white',
  },
  overlay4: {
    position: 'absolute',
    top: '135px',
    right: '-5px',
    color: 'white',
  },
  myLabel: {
    borderRadius: '15px'
  },
  [theme.breakpoints.down('md')]: {
    overlay3: {
      top: '300px',
      left: '-5px',
    },
    overlay4: {
      top: '300px',
      right: '-5px',
    }
  },
  [theme.breakpoints.down('sm')]: {
    overlay3: {
      top: '120px',
      left: '-5px',
    },
    overlay4: {
      top: '120px',
      right: '-5px',
    }
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  message: {
    whiteSpace: 'pre-line',
  },
  message2: {
    whiteSpace: 'pre-line',
    marginLeft: '40px'
  },
  heart: {
    fontSize: 'medium'
  },
  star: {
    fontSize: '20px',
  },
  username: {
    display: 'block',
    alignItems: 'center',
  },
  avt: {
    display: 'flex',
    alignItems: 'center',
    postion: 'inherit',
    margin: '5px 5px 5px 0px',
    verticalAlign: 'center',
  },
  avtCmt: {
    display: 'flex',
    alignItems: 'center',
    postion: 'inherit',
    margin: '5px 5px 5px 0px',
    verticalAlign: 'center',
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  avtStar: {
    display: 'flex',
    alignItems: 'center',
    postion: 'inherit',
    margin: '5px 5px 5px 0px',
    verticalAlign: 'center',
    width: '20px',
    height: '20px',
  },
  avtCover: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avtCover2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '2px 2px 2px 10px',
    padding: 0
  },
  cmtBlock: {
    width: '100%',
    borderRadius: '5px',
    background: 'linear-gradient(0deg, #FBFCFC 30%, #EFF1F1 90%)',
    padding: '7px 10px 0px 0px',
    // boxShadow: '0 3px 5px 2px rgba(239, 241, 241, 1)',
  },
  myBadge: {
    backgroundColor: 'red',
    color: 'yellow'
  },
  clearr: {
    padding: '0px',
    border: '1px solid gray',
    '&:hover': {
      background: 'linear-gradient(45deg, #2AB929 30%, #71F337 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      color: 'white',
      border: 'none'
    }
  }
}));