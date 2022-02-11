import { Routes, Route } from "react-router-dom";

import "./styles/Main.css";

function Main({ sections }) {
  return (
    <main className="main">
      <Routes>
        {sections.map(({ Component, path, header, ...props }) => {
          return <Route path={path} element={<Component />} {...props} />;
        })}
      </Routes>
    </main>
  );
}

export default Main;
