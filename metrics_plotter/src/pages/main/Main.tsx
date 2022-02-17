import React from "react";
import { Routes, Route } from "react-router-dom";

import "./styles/Main.css";

export interface IMainPage {
  Component?: JSX.Element;
  path: string;
  exact?: boolean;
  id: string;
}

interface props {
  sections: IMainPage[];
}

// This component is in charge on correctly positionate all the pages content in the web and create a route with a given path for every page
const Main: React.FC<props> = ({ sections }) => {
  return (
    <main className="main">
      <Routes>
        {sections.map(({ Component, path, id }) => {
          return <Route path={path} key={`main_${id}`} element={Component} />;
        })}
      </Routes>
    </main>
  );
};

export default Main;
