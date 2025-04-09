import { ProgressMaterial } from "./material";

/**
 * Sets colors for a list of dbids based on a list of progress values (0-1).
 * @param {Array<number>} dbidList - A list of dbids to set the colors for.
 * @param {Array<number>} progressList - A list of progress values to set the colors to.
 * @param {Autodesk.Viewing.GuiViewer3D} viewer - The viewer object.
 */
export function setProgressColors(dbidList, progressList, viewer) {
  const model = viewer.model;
  const tree = model.getInstanceTree();
  const frags = model.getFragmentList();
  for (let i = 0; i < dbidList.length; i++) {
    tree.enumNodeFragments(dbidList[i], (fragid) => {
      console.log(frags);
    });
  }
}
