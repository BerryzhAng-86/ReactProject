// src/appcontext.js
import React, { createContext, useState } from 'react'; // Ensure useState is imported

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [close, SetClose] = useState(false);

  return (
    <MyContext.Provider value={{ close, SetClose }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
