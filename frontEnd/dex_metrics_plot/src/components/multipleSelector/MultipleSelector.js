import "./styles/MultipleSelector.css";

function MultipleSelector({ items, header }) {
  return (
    <div className="multipleSelectorContainer">
      <div>
        <Header header={header} />
        {items.map((data) => {
          return <Item {...data} />;
        })}
      </div>
    </div>
  );
}

function Header({ header }) {
  return <h6>{header}</h6>;
}

function Item({ content, callback, callbackParameters }) {
  const onclick = () => {
    callback(callbackParameters);
  };

  return (
    <button onClick={onclick}>
      <span>{content}</span>
    </button>
  );
}

export default MultipleSelector;
