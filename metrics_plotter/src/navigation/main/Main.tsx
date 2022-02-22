import React, { useContext, useMemo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { INavigationItem } from "../sidebar/components/item/Item";

import {
  NavigationContext,
  INavigationContextData,
  IAddPageAction,
  ISetCurrentPageAction,
} from "../../context/NavigationContext";

import "./styles/Main.css";

export interface IPage {
  path: string;
  id: string;
  Component?: JSX.Element;
  exactRoute?: boolean;
  iconProps: Omit<INavigationItem, "id">;
  active?: boolean;
}

interface IWrapper {
  id: string;
}

// This component is in charge on correctly positionate all the pages content in the web and create a route with a given path for every page
const Main: React.FC<{ pages: IPage[] }> = ({ pages }) => {
  const { reducedPages, dispatchPage }: INavigationContextData =
    useContext(NavigationContext);

  // Add pages to context here. With this context the icons in the sidebar with be added
  useEffect(() => {
    pages.map(({ id, active, path, iconProps }) => {
      dispatchPage({
        type: "addPage",
        payload: { id, active, path, ...iconProps },
      } as IAddPageAction);
    });
  }, []);

  // This wrapper is used to execute a set this page as current when a page is rendered
  const Wrapper: React.FC<IWrapper> = ({ children, id }) => {
    useEffect(() => {
      console.log(reducedPages);
      console.log(id);
      

      dispatchPage({
        type: "setCurrentPage",
        payload: id,
      } as ISetCurrentPageAction);
    });

    return <>{children}</>;
  };

  // useMemo is used to prevent rerender when new pages are added to context.
  return useMemo(() => {
    return (
      <main className="main">
        <Routes>
          {pages.map(({ id, path, Component, exactRoute, ...props }) => {
            return (
              <Route
                path={path}
                element={<Wrapper id={id} children={Component}></Wrapper>}
                key={`page_${id}`}
                {...props}
              />
            );
          })}
        </Routes>
      </main>
    );
  }, []);
};

export default Main;
