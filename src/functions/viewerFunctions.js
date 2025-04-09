import { groupItemsByProperties } from "./groupItems";

/**
 * Função que altera o material das entidades selecionadas.
 * @param {Autodesk.Viewing.Viewer3D} viewer - Instância do Forge Viewer.
 */
function changeMaterialOnSelection(viewer) {
  viewer.addEventListener("selection", () => {
    const selection = viewer.getSelection();
    console.log(selection);
  });
}

/**
 * Função que retorna as funções do Viewer.
 * @param {Autodesk.Viewing.Viewer3D} viewer - Instância do Forge Viewer.
 * @returns {object} - Um objeto contendo as funções disponíveis.
 */
export function getViewerFunctions(viewer) {
  if (!viewer) {
    throw new Error("Viewer não foi inicializado corretamente.");
  }

  return {
    groupItemsByProperties: (filter) => groupItemsByProperties(viewer, filter),
    events: {
      /**
       * Eventos de seleção
       */
      selection: {
        changeMaterial: () => changeMaterialOnSelection(viewer),
      },

      /**
       * Eventos de geometria
       */
      geometry: {},
    },
  };
}
