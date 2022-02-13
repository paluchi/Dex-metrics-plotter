import "./styles/Header.css";

function Header({ header, description }) {
  return (
    <div className="headerContainer">
      <h5 className="sectionHeader">{header}</h5>
      <Description text={description} />
    </div>
  );
}

function Description({ text }) {
  return <span>add</span>;
}

export default Header;
