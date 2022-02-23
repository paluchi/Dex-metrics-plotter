import { createContext, useReducer } from "react";

// This context is used to save multiple sets of information and define a set as the current

export interface INavigationContextData {
  reducedPages: any;
  dispatchPage: Function;
}

export interface IAddPageAction {
  type: "addPage";
  payload: any;
}
export interface IAddPagesAction {
  type: "addPages";
  payload: any[];
}
export interface IReplacePagesAction {
  type: "replacePages";
  payload: any[];
}
export interface ISetCurrentPageAction {
  type: "setCurrentPage";
  payload: string;
}
export interface IRemoveCurrentPageAction {
  type: "removeCurrentPage";
  payload: never;
}
export interface IRemovePageAction {
  type: "removePage";
  payload: string;
}
export interface IRemovePagesAction {
  type: "removePages";
  payload: string[];
}
export interface INavigationReducerData {
  currentPage: object;
  pages: any[];
}

export type INavigationReducerTypes =
  | IAddPageAction
  | ISetCurrentPageAction
  | IAddPagesAction
  | IReplacePagesAction
  | ISetCurrentPageAction
  | IRemoveCurrentPageAction
  | IRemovePageAction
  | IRemovePagesAction;

export const NavigationContext = createContext<INavigationContextData>(
  {} as INavigationContextData
);

const initialState = { currentPage: {}, pages: [] };

const NavigationProvider: React.FC = ({ children }) => {
  const [reducedPages, dispatchPage] = useReducer(
    navigationReducer,
    initialState as INavigationReducerData
  );

  return (
    <NavigationContext.Provider value={{ reducedPages, dispatchPage }}>
      {children}
    </NavigationContext.Provider>
  );
};

const navigationReducer = (
  data: INavigationReducerData,
  action: INavigationReducerTypes
) => {
  const newData = { ...data };
  switch (action.type) {
    case "addPage":
      newData.pages = [...newData.pages, action.payload];
      if (action.payload.active) newData.currentPage = action.payload;
      return newData;
    case "addPages":
      newData.pages = [...newData.pages, ...action.payload];
      newData.currentPage =
        newData.pages.find((page) => page.active === true) || {};
      return newData;
    case "replacePages":
      newData.pages = [...action.payload];
      newData.currentPage =
        newData.pages.find((page) => page.active === true) || {};
      return newData;
    case "setCurrentPage":
      newData.currentPage =
        newData.pages.find((page) => page.id === action.payload) || {};
      return newData;
    case "removeCurrentPage":
      newData.currentPage = {};
      return newData;
    case "removePage":
      newData.pages = newData.pages.filter(({ id }) => id !== action.payload);
      return newData;
    case "removePages":
      newData.pages = newData.pages.filter(
        ({ id }) => !action.payload.includes(id)
      );
      return newData;
    default:
      return newData;
  }
};

export default NavigationProvider;
