import { useState, useEffect } from "react";
import { useScreenshot } from "use-react-screenshot";
import { saveAs } from "file-saver";
import { TwitterShareButton } from "react-share";

import { ReactComponent as ChartDescription } from "../../../../assets/icons/chartDescription.svg";
import { ReactComponent as ChartShare } from "../../../../assets/icons/share.svg";
import { ReactComponent as ChartDownload } from "../../../../assets/icons/download.svg";
import { ReactComponent as ChartExpand } from "../../../../assets/icons/expand.svg";
import { ReactComponent as ChartOptions } from "../../../../assets/icons/moreOptions.svg";

import "./styles/Header.css";

function Header({ header, description, parentId, chartRef }) {
  return (
    <div className="headerContainer">
      <h5>{header}</h5>
      <Description text={description} />
      <Options
        parentId={`${parentId}`}
        chartRef={chartRef}
        imageName={header}
      />
    </div>
  );
}

function Description({ text }) {
  const [showDescription, setShowDescription] = useState(false);

  const onHover = () => {
    setShowDescription(true);
  };
  const onUnhover = () => {
    setTimeout(() => {
      setShowDescription(false);
    }, 100);
  };

  return (
    <div>
      <span onMouseOver={onHover} onMouseLeave={onUnhover}>
        <ChartDescription fill={"#808080"} strokeWidth={0} />
      </span>
      {showDescription && (
        <div className="chartDescriptionContainer">
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

function Options({ imageName, parentId, chartRef }) {
  const [image, takeScreenshot] = useScreenshot();

  const getImage = () => takeScreenshot(chartRef.current);

  useEffect(() => {
    image && saveAs(image, `${imageName}.jpg`);
  }, [image]);

  const onShareClick = () => {
    console.log("share pressed");
  };
  const onDownloadClick = () => {
    getImage();
  };
  const onExpandClick = () => {
    console.log("share pressed");
  };
  const onOptionsClick = () => {
    console.log("share pressed");
  };

  const shareButton = () => {
    return (
      <TwitterShareButton
        url={"https://github.com/paluchi/dex_reader"}
        title={"Look at this!\n"}
        related={["GonzaloAlessa"]}
        hashtags={["greatApp"]}
        via={"MyLocalHostApp"}
      >
        <ChartShare fill={"#808080"} strokeWidth={0} />
      </TwitterShareButton>
    );
  };

  const options = [
    { Component: shareButton, callback: onShareClick },
    { Component: ChartDownload, callback: onDownloadClick },
    { Component: ChartExpand, callback: onExpandClick },
    { Component: ChartOptions, callback: onOptionsClick },
  ];

  return (
    <ul className="chartOptionsContainer">
      {options.map(({ Component, callback }, index) => {
        return (
          <li onClick={callback} key={`chart_${parentId}_options_${index}`}>
            <Component fill={"#808080"} strokeWidth={0} />
          </li>
        );
      })}
    </ul>
  );
}

export default Header;
