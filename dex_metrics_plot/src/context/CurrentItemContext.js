import React, { createContext, useState } from "react";

export const CurrentItemContext = createContext();

// A generic context that provides data about a current item or set of items in needed 
export const CurrentItemProvider = ({ children }) => {
  const [currentItem, setCurrentItem] = useState();

  return (
    <CurrentItemContext.Provider value={{ currentItem, setCurrentItem }}>
      {children}
    </CurrentItemContext.Provider>
  );
};
