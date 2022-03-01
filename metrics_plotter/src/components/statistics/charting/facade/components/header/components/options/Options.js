import { useEffect, useRef } from "react";

import { useScreenshot } from "use-react-screenshot";
import { saveAs } from "file-saver";
import { TwitterShareButton } from "react-share";

import ChartShare from "../../../../../../../icons/Share";
import ChartDownload from "../../../../../../../icons/Download";
import ChartExpand from "../../../../../../../icons/Expand";
import ChartOptions from "../../../../../../../icons/MoreOptions";

import "./styles/Options.css";

// Presents a set of usefull options for the chat. (share, download, expand, others)
// Makes use of a custom hook that takes a screenshot of a ref component (body child)
// Makes use oF a twitter share module (must add other options. should use other module)
function Options({ imageName, id, chartRef, expandCallback }) {
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
    expandCallback();
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
          <li onClick={callback} key={`chart_${id}_options_${index}`}>
            <Component fill={"#808080"} strokeWidth={0} />
          </li>
        );
      })}
    </ul>
  );
}

export default Options;
