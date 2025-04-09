import React, { createContext, useState, useEffect, useContext } from "react";

const ViewerContext = createContext(null);

export const useViewer = () => {
  return useContext(ViewerContext);
};

export const ViewerProvider = ({ accessToken, documentId, children }) => {
  const [viewer, setViewer] = useState(null);
  const [isViewerLoaded, setIsViewerLoaded] = useState(false);

  useEffect(() => {
    if (!window.Autodesk || !document.getElementById("forgeViewer")) {
      console.error("Biblioteca Autodesk ou div do viewer não encontrada.");
      return;
    }

    const options = {
      env: "AutodeskProduction",
      accessToken: accessToken,
    };

    window.Autodesk.Viewing.Initializer(options, () => {
      const viewerDiv = document.getElementById("forgeViewer");
      const newViewer = new window.Autodesk.Viewing.GuiViewer3D(viewerDiv);
      newViewer.start();

      window.Autodesk.Viewing.Document.load(
        documentId,
        (doc) => {
          const defaultModel = doc.getRoot().getDefaultGeometry();
          newViewer.loadDocumentNode(doc, defaultModel);

          if (newViewer) {
            console.log("Modelo carregado!");
            setIsViewerLoaded(true);
            setViewer(newViewer);
          }
        },
        (error) => {
          console.error("Erro ao carregar o documento:", error);
        }
      );
    });
  }, [accessToken, documentId]);

  return (
    <ViewerContext.Provider value={{ viewer, isViewerLoaded }}>
      {children}
    </ViewerContext.Provider>
  );
};
