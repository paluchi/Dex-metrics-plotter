import { useContext, useEffect } from "react";

import "./styles/MultipleSelector.css";
import {
  CurrentItemProvider,
  CurrentItemContext,
} from "../../context/CurrentItemContext";

export interface IItem {
  content: any;
  callback: Function;
  callbackParameters: any;
  active?: boolean;
}

export interface IMultipleSelector {
  items: IItem[];
  header?: string;
  id: string;
  style?: object;
}

// Presents a set of given selectors. use a local context (generic currentItem context) to set which one is the active
// If a header is given render it too
const MultipleSelector: React.FC<IMultipleSelector> = ({
  items,
  header,
  id,
  ...ExtraProps
}) => {
  return (
    <CurrentItemProvider>
      <div className={`multipleSelectorContainer`} {...ExtraProps}>
        {header && <Header header={header} />}
        <ul>
          {items.map((data, index) => {
            return <Item {...data} key={`${id}_multipleSelector_${index}`} />;
          })}
        </ul>
      </div>
    </CurrentItemProvider>
  );
};

const Header: React.FC<{ header: string }> = ({ header }) => {
  return <h6>{header}</h6>;
};

// Selector item presenter and relations with local context
const Item: React.FC<IItem> = ({
  content,
  callback,
  callbackParameters,
  active,
  ...props
}) => {
  const { currentItem, setCurrentItem } = useContext(CurrentItemContext);

  // If at first render the item is active then programatically handle a click to set all in place
  useEffect(() => {
    active && handleClick();
  }, []);

  // If the item is pressed then set it as active and call the callback with the given parameters
  const handleClick = () => {
    setCurrentItem({ content });
    callback(callbackParameters);
  };

  // Set active render variables
  const background: string | undefined =
    currentItem?.content === content ? "#E2E8F3" : undefined;
  const color: string | undefined =
    currentItem?.content === content ? undefined : undefined;
  const borderColor: string | undefined =
    currentItem?.content === content ? "#65aad3" : undefined;

  return (
    <li onClick={handleClick} style={{ background, borderColor }} {...props}>
      <span>{content}</span>
    </li>
  );
};

export default MultipleSelector;
