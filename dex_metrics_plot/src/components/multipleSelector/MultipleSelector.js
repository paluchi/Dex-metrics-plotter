import { useContext, useEffect } from "react";

import "./styles/MultipleSelector.css";
import {
  CurrentItemProvider,
  CurrentItemContext,
} from "../../context/CurrentItemContext";


// Presents a set of given selectors. use a local context (generic currentItem context) to set which one is the active
// If a header is given render it too
function MultipleSelector({ items, header }) {
  return (
    <CurrentItemProvider>
      <div className="multipleSelectorContainer">
        <div>
          {header && <Header header={header} />}
          {items.map((data, index) => {
            return (
              <Item
                {...data}
                key={`multiple_selector_${data.id || "default"}_${index}`}
              />
            );
          })}
        </div>
      </div>
    </CurrentItemProvider>
  );
}

function Header({ header }) {
  return <h6>{header}</h6>;
}


// Selector item presenter and relations with local context
function Item({ content, callback, callbackParameters, active }) {
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
  const background = currentItem?.content === content ? "#E2E8F3" : undefined;
  const color = currentItem?.content === content ? undefined : undefined;
  const borderColor = currentItem?.content === content ? "#65aad3" : undefined;

  return (
    <button onClick={handleClick} style={{ background, borderColor }}>
      <span>{content}</span>
    </button>
  );
}

export default MultipleSelector;
