import React, { useState } from "react";

export const Context = React.createContext();

const Provider = props => { 

  const [name, setName] = useState("Batman");

  return (
    <Context.Provider
      value={{
        name,
        updateName: name => setName(name),
        
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
