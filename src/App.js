import React, { useState } from "react";
import { ViewerProvider, useViewer } from "./context";
import ViewerContainer from "./container";
import { GroupItemsComponent, EventsLoader } from "./functions/FunctionsLoader";

const ButtonsContainer = () => {
  const { isViewerLoaded } = useViewer();

  if (!isViewerLoaded) return null; // Só renderiza quando o viewer estiver pronto

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        backgroundColor: "rgba(0, 123, 194, 0.9)",
        padding: "10px",
        borderRadius: "4px",
        boxShadow: "0 0 5px rgba(0,0,0,0.3)",
      }}
    >
      <GroupItemsComponent />
      <EventsLoader />
    </div>
  );
};

const App = () => {
  const modelInfo = {
    urn: "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmgwa2o2QlJ2UmNtYUdtNmFaRjlrMEE_dmVyc2lvbj0x",
    token:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IlhrUFpfSmhoXzlTYzNZS01oRERBZFBWeFowOF9SUzI1NiIsInBpLmF0bSI6ImFzc2MifQ.eyJzY29wZSI6WyJkYXRhOmNyZWF0ZSIsImRhdGE6cmVhZCIsImRhdGE6d3JpdGUiLCJ2aWV3YWJsZXM6cmVhZCJdLCJjbGllbnRfaWQiOiJqQk1yeGRRMElqQ0k2R01raEp5a3ZRd0Z3aExTQlZOcCIsImlzcyI6Imh0dHBzOi8vZGV2ZWxvcGVyLmFwaS5hdXRvZGVzay5jb20iLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbSIsImp0aSI6ImJWSzZxSGhmN0RuMXNaUDFyYUIzM0VxSWFQU2dvTWxqMGw2djF3eTFPNWN6YTh2dXh2VFJGUWJ3cU9hajFRd00iLCJleHAiOjE3NDEwOTUyNzQsInVzZXJpZCI6IjlUQzhSVlZESjJSVyJ9.fgZHf8KbQLdePNEpxVHEe1RoOMyfIpns7ObGHrIGm3tdQGvrZRa-IeYBWhsbRVm1dDuS3AzSmRWEtw9wuBUDG6BJeAVSH-g3wj3cM_v0wx-BLPxjcp41OgK46pFRhwcZH7n3el6uGFyTNLl4SBowA_yKHaFOIofp_3_baN0OqR3alFpjupZOkaJE9bpfxJxLxjHaAj94DLTUNH4debw4K_v1jbcrSZnP7gRvL7LX-HoRagFwIIKbn06RBQUFtc7j-OYTFxj3BROjHpGvSGtCyGo-YyIVIz7syBodSTomwSy9_KX3GB1LVuB4ZcyN6ZzuaViRS7OVblppixblYvwFFQ",
  };

  const [selectedDocumentId] = useState(modelInfo.urn);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <ViewerProvider
        accessToken={modelInfo.token}
        documentId={selectedDocumentId}
      >
        <ViewerContainer />
        <ButtonsContainer />
      </ViewerProvider>
    </div>
  );
};

export default App;
