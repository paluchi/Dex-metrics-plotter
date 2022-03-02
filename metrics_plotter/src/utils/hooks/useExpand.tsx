import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import useWindowDimensions from "./useWindowDimensions";

interface IPlaceHolder {
  width: number;
  height: number;
  style: CSSStyleDeclaration;
}

type IExpandElement = (element: HTMLElement | null) => void;

type ISetPlaceHolder = (element: HTMLElement | null) => HTMLElement | null;

const useExpand = (ref: React.RefObject<HTMLDivElement>) => {
  const { width: WWidth, height: WHeight } = useWindowDimensions();
  const [expand, setexpand] = useState<boolean>(false);

  useEffect(() => {
    switch (expand) {
      case true:
        const element = setPlaceHolder(ref.current);
        expandElement(element);
        break;
      case false:
        break;
    }
  }, [expand, WWidth, WHeight]);

  const expandElement: IExpandElement = (element) => {
    if (element) {

      element.style.top = "0px";
      element.style.left = "0px";
      element.style.width = `${WWidth}px`;
      element.style.height = `${WHeight}px`;
    }
  };

  const setExpand = (state?: boolean) => {
    setexpand((prev) => state || !prev);
  };

  return setExpand;
};

export default useExpand;

const setPlaceHolder: ISetPlaceHolder = (element) => {
  const width = element?.clientWidth;
  const height = element?.clientHeight;
  if (element) {
    element.style.position = "absolute";
    element.id = "useExpand_element";

    const newElement = document.createElement("div");
    // newElement.style.position = "relative";
    newElement.style.width = `${width}px`;
    newElement.style.height = `${height}px`;
    newElement.style.backgroundColor = `white`;
    // newElement.style.padding = `${element.style.padding}px`;
    // newElement.style.paddingTop = `${element.style.paddingTop}px`;
    // newElement.style.paddingBottom = `${element.style.paddingBottom}px`;
    // newElement.style.paddingLeft = `${element.style.paddingLeft}px`;
    // newElement.style.paddingRight = `${element.style.paddingRight}px`;
    // newElement.style.margin = `${element.style.margin}px`;
    // newElement.style.marginTop = `${element.style.marginTop}px`;
    // newElement.style.marginBottom = `${element.style.marginBottom}px`;
    // newElement.style.marginLeft = `${element.style.marginLeft}px`;
    // newElement.style.marginRight = `${element.style.marginRight}px`;

    newElement.innerHTML = element.outerHTML;

    element.parentElement?.replaceChild(newElement, element);
    return newElement.querySelector<HTMLElement>("#useExpand_element");
  }
  return null;
};

const contractComponent = () => {};

const PlaceHolder: React.FC<IPlaceHolder> = ({ style, width, height }) => {
  return (
    <div
      style={{
        padding: style.padding,
        paddingBottom: style.paddingBottom,
        paddingTop: style.paddingTop,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        margin: style.margin,
        marginBottom: style.marginBottom,
        marginTop: style.marginTop,
        marginLeft: style.marginLeft,
        marginRight: style.marginRight,
        width: width,
        height: height,
        backgroundColor: "white",
      }}
    />
  );
};
