import * as THREE from "three";
import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import { useSelector } from "react-redux";
import {
  set_model_pivot_axis,
  set_model_to_destroy,
  set_model_destroy_trigger,
  set_reset_raid_models,
} from "../../Store.tsx";

type GLTFResult = GLTF & {
  nodes: {
    Cube001: THREE.Mesh;
  };
  materials: {
    ["Material.012"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const dispatch = useDispatch();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active);
  const frames_active = useSelector((state: RootState) => state.modelsData.frames_active);
  const model_creation_state = useSelector((state: RootState) => state.modelsData.model_creation_state);
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures);
  const enable_model_material= useSelector((state: RootState) => state.pageSettings.enable_model_material); //prettier-ignore
  const model_destroy_tigger = useSelector((state: RootState) => state.modelsData.model_destroy_trigger); //prettier-ignore
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore

  const { nodes, materials } = useGLTF("./models/metal_floor_frame_square_textured.glb") as GLTFResult;
  const [model_hover, set_model_hover] = useState<boolean>(false);
  const [model_selected, set_model_selected] = useState<boolean>(false);
  const [model_destroyed, set_model_destroyed] = useState<boolean>(false);

  function ModelOnClick() {
    if (page_mode === "edit") {
      dispatch(set_model_pivot_axis("XYZ"));
      set_model_selected(true);
    } else if (page_mode === "raid") {
      set_model_selected(true);
      dispatch(set_model_to_destroy(Model.displayName));
      set_model_destroyed(true);
      dispatch(set_model_destroy_trigger(model_destroy_tigger + 1));
    }
  }

  function ModelMissedClick() {
    if (!model_creation_state && page_mode !== "overview") {
      set_model_selected(false);
    }
  }

  function ModelOnPointerOver() {
    if (!model_creation_state && page_mode !== "overview") {
      set_model_hover(true);
    }
  }

  function ModelOnPointerOut() {
    if (!model_creation_state && page_mode !== "overview") {
      set_model_hover(false);
    }
  }

  const ModelMaterialOpacity = () => {
    if (enable_model_material) {
      return model_selected ? 1 : model_hover ? 0.6 : 1;
    } else return 1;
  };

  const ModelMaterialColor = () => {
    if (enable_model_material) {
      if (page_mode === "edit") {
        return model_selected ? "#f5b784" : model_hover ? "#ffdaba" : "#bbbbbb";
      } else if (page_mode === "raid") {
        return model_hover ? "red" : "#bbbbbb";
      }
    }
  };

  const ModelMaterialWireframe = () => {
    return models_xray_active ? true : false;
  };

  useEffect(() => {
    {
      set_model_destroyed(false);
      set_model_hover(false);
      set_model_selected(false);
    }
  }, [reset_raid_models]);

  useEffect(() => {
    {
      set_model_hover(false);
      set_model_selected(false);
    }
  }, [page_mode]);

  return (
    <>
      {frames_active && !model_destroyed && (
        <group {...props} dispose={null}>
          {enable_model_textures && !model_hover && (page_mode === "overview" || page_mode === "raid") ? (
            <mesh
              key="textured"
              geometry={nodes.Cube001.geometry}
              material={materials["Material.012"]}
              onClick={() => ModelOnClick()}
              onPointerOver={(e) => {
                e.stopPropagation(), ModelOnPointerOver();
              }}
              onPointerOut={() => ModelOnPointerOut()}
              onPointerMissed={() => ModelMissedClick()}
            ></mesh>
          ) : (
            <mesh
              key="not-textured"
              geometry={nodes.Cube001.geometry}
              onClick={() => ModelOnClick()}
              onPointerOver={(e) => {
                e.stopPropagation(), ModelOnPointerOver();
              }}
              onPointerOut={() => ModelOnPointerOut()}
              onPointerMissed={() => ModelMissedClick()}
            >
              <meshStandardMaterial
                transparent={true}
                opacity={ModelMaterialOpacity()}
                color={ModelMaterialColor()}
                wireframe={ModelMaterialWireframe()}
              />
            </mesh>
          )}
        </group>
      )}
    </>
  );
}

useGLTF.preload("./models/metal_floor_frame_square_textured.glb");

Model.displayName = "MetalFloorFrameSquare";
