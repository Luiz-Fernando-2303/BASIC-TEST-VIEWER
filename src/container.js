import React, { useEffect } from "react";
import { useViewer } from "./context";

const ViewerContainer = () => {
  const viewer = useViewer();

  useEffect(() => {
    if (viewer) {
      console.log("Viewer iniciado:", viewer);
    }
  }, [viewer]);

  return <div id="forgeViewer" style={{ width: "100vw", height: "100vh" }} />;
};

export default ViewerContainer;
