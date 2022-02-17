import { useEffect, useRef } from "react";

import { useScreenshot } from "use-react-screenshot";
import { saveAs } from "file-saver";
import { TwitterShareButton } from "react-share";

import IChartShare from "../../../../icons/Share";
import IChartDownload from "../../../../icons/Download";
import IChartExpand from "../../../../icons/Expand";
import IChartOptions from "../../../../icons/MoreOptions";

import "./styles/Options.css";

// Presents a set of usefull options for the chat. (share, download, expand, others)
// Makes use of a custom hook that takes a screenshot of a ref component (body child)
// Makes use oF a twitter share module (must add other options. should use other module)
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
    setTimeout(() => {}, 5);
  };
  const onExpandClick = () => {
    console.log("expand pressed");
  };
  const onOptionsClick = () => {
    console.log("options pressed");
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
        <IChartShare fill={"#808080"} strokeWidth={0} />
      </TwitterShareButton>
    );
  };

  const options = [
    { Component: shareButton, callback: onShareClick },
    { Component: IChartDownload, callback: onDownloadClick },
    { Component: IChartExpand, callback: onExpandClick },
    { Component: IChartOptions, callback: onOptionsClick },
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

export default Options;
