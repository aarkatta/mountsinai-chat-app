import React from 'react'
import Header from './components/Header'
import ChatMessages from './components/ChatMessages'
import SendMessage from './components/SendMessage'
import Provider from "./components/Proivder";

function App() {

   

    return (
      <div>
        <Header />
        <Provider > 
          <ChatMessages  />       
          <SendMessage  />  
        </Provider>
            
        

      </div>
    )
  
}
export default App