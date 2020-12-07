import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Context } from "./Proivder";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
    button: {
        margin: theme.spacing(1),
      },
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function SendMessage() {
  const classes = useStyles();
  const [text, setText] = useState('');
  const { name, updateName } = useContext(Context);
  const SEND_MESSAGE_API = process.env.REACT_APP_SEND_MESSAGE_API; 
  const SEND_LABEL = process.env.REACT_APP_SEND_LABEL;
  const apiKey = process.env.REACT_APP_MESSAGE_API_KEY;
	const clientId = process.env.REACT_APP_MESSAGE_API_CLIENT_ID;
	const clientSecret = process.env.REACT_APP_MESSAGE_API_CLIENT_SECRET; 

  async function sendMessage(message) {
    await fetch(SEND_MESSAGE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'client-id': clientId,
        'client-secret': clientSecret,
      },
      body: JSON.stringify({
        name,
        text,
      }),
    });
    setText('');
    
  }

  function handleTextKeyDown (e) {    
    if (e.key === 'Enter' && text.length > 0) {      
      sendMessage();
    }
  }

  return (
    <form  noValidate autoComplete="off">      
     <Container>
    <div className={classes.root}>
      <TextField id="outlined-basic" label="Your Name..." variant="outlined" value = {name} onChange={(e) => updateName(e.target.value)} />
      <TextField id="outlined-basic" label="Message..." variant="outlined" value = {text} onChange={(e) => setText(e.target.value)} onKeyDown={handleTextKeyDown} />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}   
        onClick={sendMessage}           >
        {SEND_LABEL}
      </Button>
      </div>
      </Container>
    </form>
  );
}
