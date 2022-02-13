import React, { createContext, useState } from "react";

export const CurrentItemContext = createContext();

export const CurrentItemProvider = ({ children }) => {
  const [currentItem, setCurrentItem] = useState();

  return (
    <CurrentItemContext.Provider value={{ currentItem, setCurrentItem }}>
      {children}
    </CurrentItemContext.Provider>
  );
};
