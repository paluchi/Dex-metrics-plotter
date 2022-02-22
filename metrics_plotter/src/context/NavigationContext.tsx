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
export interface ISetCurrentPageAction {
  type: "setCurrentPage";
  payload: string;
}
export interface INavigationReducerData {
  currentPage: object;
  pages: any[];
}

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
  action: IAddPageAction | ISetCurrentPageAction
) => {
  const newData = { ...data };
  switch (action.type) {
    case "addPage":
      newData.pages = [...newData.pages, action.payload];
      if (action.payload.active) newData.currentPage = action.payload;
      return newData;
    case "setCurrentPage":
      const page = newData.pages.find((page) => page.id === action.payload);
      console.log("action.payload.active", newData.pages);
      console.log(newData.pages.find((page) => page.id === action.payload));
      
      newData.currentPage = page;
      return newData;
    default:
      return newData;
  }
};

export default NavigationProvider;
