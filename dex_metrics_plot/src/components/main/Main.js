import { Routes, Route } from "react-router-dom";

import "./styles/Main.css";

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
