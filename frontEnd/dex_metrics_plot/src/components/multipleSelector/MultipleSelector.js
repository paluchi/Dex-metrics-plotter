import { useContext, useEffect } from "react";

import "./styles/MultipleSelector.css";
import {
  CurrentItemProvider,
  CurrentItemContext,
} from "../../context/CurrentItemContext";

function MultipleSelector({ items, header }) {
  return (
    <CurrentItemProvider>
      <div className="multipleSelectorContainer">
        <div>
          <Header header={header} />
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

function Item({ content, callback, callbackParameters, active }) {
  const { currentItem, setCurrentItem } = useContext(CurrentItemContext);

  useEffect(() => {
    active && handleClick();
  }, []);

  const handleClick = () => {
    setCurrentItem({ content });
    callback(callbackParameters);
  };

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
