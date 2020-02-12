import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

let updateMessage;

export const notify = (message) => {
    updateMessage(message)
};

export const Notification = (props) => {

  const [vertical] = React.useState('bottom');
  const [horizontal] = React.useState('right');
  const [message, setMessage] = React.useState('');
  updateMessage = setMessage;

  useEffect(() => {
    setMessage(props.message);
  }, [props])

  const handleClose = () => {
    setMessage('')
  };
const content = (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={message && message.length ? true : false}
        onClose={handleClose}
        message={message}
      />);
  return content;
}
