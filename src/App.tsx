import { useState } from "react";
import CanvasContainer from "./components/script/CanvasContainer.tsx";
import Toolbar from "./components/script/Toolbar.tsx";
import Version from "./components/script/Version.tsx";

import "./components/styles/global.css";
import "./components/styles/canvas_container.css";
import "./components/styles/toolbar.css";
import "./components/styles/version.css";

function App() {
  return (
    <div>
      <Toolbar />
      <CanvasContainer />
      <Version />
    </div>
  );
}

export default App;

// reset camera
// 3d camera / 2d camera 5 sides
// dark-light theme
// performance settings
// list of active canvas 3d objects (editable)
// object move type: mouse, gizmo
// object copy: "C"
// object delete: "del"
// controls menu (mouse + keyboard)
// upkeep cost
// build cost
// raid cost
// different "save files / base plans"
// xray
// "overview" - more rendered look, more lights and so on / "edit" - more raw look
// 2 types of building (freehand - without snapping and restrictions, with rust rules - with snapping and restrictions)

//errors?
// - if 2 or more models are in the cursor line, the last one is selected on click, not the first one, both aquire hover color

// 0.23.0 / Added temporary stone_wall_high_glb / different pivot axis controls (ZYX / ZX ) depending on the model clicked
