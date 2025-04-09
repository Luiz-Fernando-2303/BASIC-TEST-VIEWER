import React, { useEffect, useState } from "react";
import { getViewerFunctions } from "./viewerFunctions";
import { useViewer } from "../context";

const GroupItemsComponent = () => {
  const { viewer, isViewerLoaded } = useViewer();
  const [viewerFunctions, setViewerFunctions] = useState(null);

  useEffect(() => {
    if (viewer && isViewerLoaded) {
      console.log("Viewer carregado e pronto para uso!");
      setViewerFunctions(getViewerFunctions(viewer));
    }
  }, [viewer, isViewerLoaded]);

  const handleGroupItems = async () => {
    if (!viewerFunctions) {
      console.warn("Viewer ainda não está carregado.");
      return;
    }

    try {
      await viewerFunctions.groupItemsByProperties();
    } catch (error) {
      console.error("Erro ao agrupar itens:", error);
    }
  };

  if (!isViewerLoaded) {
    return null; // Não renderiza nada enquanto o Viewer não estiver pronto
  }

  return (
    <button onClick={handleGroupItems} disabled={!viewerFunctions}>
      Agrupar Itens
    </button>
  );
};

const EventsLoader = () => {
  const { viewer, isViewerLoaded } = useViewer();
  const [viewerFunctions, setViewerFunctions] = useState(null);

  useEffect(() => {
    if (viewer && isViewerLoaded) {
      console.log("Viewer carregado e pronto para uso!");
      setViewerFunctions(getViewerFunctions(viewer));
    }
  }, [viewer, isViewerLoaded]);

  const loadEvents = () => {
    if (!viewerFunctions) {
      console.warn("Viewer ainda não está carregado.");
      return;
    }

    try {
      viewerFunctions.events.selection.changeMaterial();
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    }
  };

  useEffect(() => {
    if (viewerFunctions) {
      loadEvents();
    }
  }, [viewerFunctions]);

  return null;
};

export { GroupItemsComponent, EventsLoader };
