import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";

interface IPlaceHolder {
  width: number;
  height: number;
}

type IExpandComponent = (component: React.ReactNode) => void;

type ISetPlaceHolder = (
  component: HTMLDivElement | null,
  display: {
    width: number | undefined;
    height: number | undefined;
  }
) => React.ReactNode;

const useExpand = (ref: React.RefObject<HTMLDivElement>) => {
  const [expand, setexpand] = useState<boolean>(false);

  useEffect(() => {
    const width = ref.current?.clientWidth;
    const height = ref.current?.clientHeight;
    switch (expand) {
      case true:
        const component = setPlaceHolder(ref.current, { width, height });
        expandComponent(component);
        break;
      case false:
        break;
    }
  }, [expand]);

  const setExpand = (state?: boolean) => {
    setexpand((prev) => state || !prev);
  };

  return setExpand;
};

export default useExpand;

const PlaceHolder: React.FC<IPlaceHolder> = ({ width, height }) => {
  return (
    <div style={{ width: width, height: height, backgroundColor: "white" }} />
  );
};

const setPlaceHolder: ISetPlaceHolder = (component, { width, height }) => {
  if (component) {
    component.style.position = "absolute";
    component.parentElement!.style.position = "relative";

    const newOrg = ReactDOMServer.renderToString(
      <div style={{ position: "relative", width: 0, height: 0 }}></div>
    );

    component.innerHTML =
      newOrg +
      ReactDOMServer.renderToString(
        <PlaceHolder width={width || 0} height={height || 0} />
      );
  }

  return component;
};

const expandComponent: IExpandComponent = (component) => {
  const { innerWidth, innerHeight } = window;
};
const contractComponent = () => {};
