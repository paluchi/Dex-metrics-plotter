import React, { useEffect } from "react";

//import useScreenshot from "use-react-screenshot"; // Only works with js :(
//import { saveAs } from "file-saver";
import { TwitterShareButton } from "react-share";

const chartShare = require("../../../../../assets/icons/share.svg") as string;
const chartDownload =
  require("../../../../../assets/icons/download.svg") as string;
const chartExpand = require("../../../../../assets/icons/expand.svg") as string;
const chartOptions =
  require("../../../../../assets/icons/moreOptions.svg") as string;

import "./styles/Options.css";

interface IOptions {
  imageName: string;
  id: string;
  chartRef: React.RefObject<HTMLDivElement>;
}

// Presents a set of usefull options for the chat. (share, download, expand, others)
// Makes use of a custom hook that takes a screenshot of a ref component (body child)
// Makes use oF a twitter share module (must add other options. should use other module)
const Options: React.FC<IOptions> = ({ imageName, id, chartRef }) => {
  //const [image, takeScreenshot] = useScreenshot();

  // const getImage = () => takeScreenshot(chartRef.current);

  // useEffect(() => {
  //   image && saveAs(image, `${imageName}.jpg`);
  // }, [image]);

  const onShareClick = () => {
    console.log("share pressed");
  };
  const onDownloadClick = () => {
    // getImage();
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
        <svg fill={"#808080"} strokeWidth={0}>
          {chartShare}
        </svg>
      </TwitterShareButton>
    );
  };

  const options = [
    { icon: shareButton, callback: onShareClick },
    { icon: chartDownload, callback: onDownloadClick },
    { icon: chartExpand, callback: onExpandClick },
    { icon: chartOptions, callback: onOptionsClick },
  ];

  return (
    <ul className="chartOptionsContainer">
      {options.map(({ icon, callback }, index) => {
        return (
          <li onClick={callback} key={`chart_${id}_options_${index}`}>
            <svg fill={"#808080"} strokeWidth={0}>
              {icon}
            </svg>
          </li>
        );
      })}
    </ul>
  );
};

export default Options;
