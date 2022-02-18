import { useState, useReducer } from "react";

import {
  IMultipleSelector,
  IItem,
} from "../../../../../multipleSelector/MultipleSelector";

interface IModifierItem {
  content: any;
  value: any;
  active?: boolean;
}

export interface IModifier {
  items: IModifierItem[];
  header?: string;
  id: string;
  style?: object;
}

interface addMultipleSelectorPayload {
  [propName: string]: any;
}

interface setMultipleSelectorPayload {
  value: any;
  selector: string;
}

interface IModifiersReducerActionAndAdd {
  type: "addMultipleSelector";
  payload: addMultipleSelectorPayload[];
}
interface IModifiersReducerActionAndSet {
  type: "setMultipleSelector";
  payload: setMultipleSelectorPayload;
}

interface IModifiersReducer {
  [propName: string]: any;
}

const useModifiers = (
  modifiers: IModifier[]
): [IModifiersReducer, IMultipleSelector[]] => {
  const initialState = {};

  const modifiersReducer = (
    modifiers: IModifiersReducer,
    action: IModifiersReducerActionAndAdd | IModifiersReducerActionAndSet
  ) => {
    switch (action.type) {
      case "addMultipleSelector":
        action.payload.map((selector: addMultipleSelectorPayload) => {
          modifiers = { ...modifiers, ...selector };
        });
        return modifiers;
      case "setMultipleSelector":
        modifiers[action.payload.selector] = action.payload.value;
        return { ...modifiers };
      default:
        return modifiers;
    }
  };

  const [reducedModifiers, displatchModifier] = useReducer(
    modifiersReducer,
    initialState
  );

  const [multipleSelectors, setMultipleSelectors] = useState<
    IMultipleSelector[]
  >([] as IMultipleSelector[]);

  // At first render start the new metrics reader
  const MSelectors: IMultipleSelector[] = [];
  modifiers?.map(({ items: modItems, ...mod }) => {
    const activeValue = modItems.find((item) => item.active === true)?.value;

    const modState: addMultipleSelectorPayload = {};
    modState[mod.id] = activeValue;

    const items: IItem[] = modItems.map(({ content, value, active }) => {
      return {
        content: content,
        callbackParameters: {
          type: "setMultipleSelector",
          payload: { selector: mod.id, value: value },
        },
        active: active,
        callback: displatchModifier,
      };
    });

    const multipleSelector: IMultipleSelector = { items: items, ...mod };
    MSelectors.push(multipleSelector);
    setMultipleSelectors(MSelectors);

    displatchModifier({
      type: "addMultipleSelector",
      payload: MSelectors,
    });
  });

  return [reducedModifiers, multipleSelectors];
};

export default useModifiers;
