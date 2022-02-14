import { Routes, Route } from "react-router-dom";

import "./styles/Main.css";


// This component is in charge on correctly positionate all the pages content in the web and create a route with a given path for every page 
function Main({ sections }) {
  return (
    <main className="main">
      <Routes>
        {sections.map(({ Component, path, header, ...props }, index) => {
          return (
            <Route
              path={path}
              {...props}
              key={`main_${header}_${path}_${index}`}
              element={Component}
            />
          );
        })}
      </Routes>
    </main>
  );
}

export default Main;
