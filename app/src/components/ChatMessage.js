import React, { useEffect, useRef } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(56),   
    },
    
  },

  messagesbody: {    
    width: '90%',
    
  },

  mymessage : {
    textAlign: 'right',    
    rounded: true,
    paddingTop: 5,    
    opacity: 0.8,
    width: '100%',
    color: '#d80cdf'
  }

}));

const ChatMessage = ( props ) => {
  const classes = useStyles();
  const messagesEndRef = useRef()
  useEffect(() => {
    if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }});

  
    return (

    <Paper elevation={10}>
      
      <Container maxWidth="md">
      
        <Typography component="div" style={{ backgroundColor: '#ddd', overflow:'auto',  display:'block' }}  >
        
          <div className={classes.root}>

              <div className={classes.messagesbody}>
                {props.messages.map((message, i) => {
                  const myMessage = message.name === props.name;                  
                  return (
                    <div className={    `${myMessage ? classes.mymessage : ''}`  } key={i}>                      
                      <strong>{message.name}{message.name ? ':' : ""    } </strong> {message.text}
                      <div ref={messagesEndRef} />
                      
                    </div>
                  );
                })}                
              </div> 
                      
          </div>
          
        </Typography>
       
      </Container>
      
    </Paper>

    )

};

export default ChatMessage;
