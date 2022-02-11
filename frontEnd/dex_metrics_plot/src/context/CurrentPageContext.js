import React, { createContext, useState } from "react";

export const CurrentPageContext = createContext();

export const CurrentPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState();

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
};
