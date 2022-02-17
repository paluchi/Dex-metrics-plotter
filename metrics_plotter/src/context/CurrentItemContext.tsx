import { createContext, useState } from "react";

// This is a super generic context and can be user for everything.
// Great for fast depeloping but bad for very robust code.
interface IContextProviderProps {
  children: JSX.Element;
}
export interface ITodosContextData {
  currentItem: any;
  setCurrentItem: React.Dispatch<React.SetStateAction<any>>;
}

export const CurrentItemContext = createContext<ITodosContextData>(
  {} as ITodosContextData
);

// A generic context that provides data about a current item or set of items in needed
export const CurrentItemProvider: React.FC<IContextProviderProps> = ({
  children,
  ...extraParams
}) => {
  const [currentItem, setCurrentItem] = useState<any>("asd");

  return (
    <CurrentItemContext.Provider
      value={{ currentItem, setCurrentItem, ...extraParams }}
    >
      {children}
    </CurrentItemContext.Provider>
  );
};
