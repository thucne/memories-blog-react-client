import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

// import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, emails } = props;
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const newSet = getUniqueListBy(emails, 'avt');

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      {/* <DialogTitle id="simple-dialog-title">All who send Heart</DialogTitle> */}
      <List>
        {newSet.map((email, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar className={classes.avatar} src={email.avt} />
            </ListItemAvatar>
            <ListItemText primary={email.email ? email.email : 'Google user (We will try to detect and show this kind of user as well!)'} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ShowAllAvts({open, setOpen, setOfValues}) {
  
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
 
      <SimpleDialog emails={setOfValues} selectedValue={selectedValue} open={open} onClose={handleClose} />

  )
}
