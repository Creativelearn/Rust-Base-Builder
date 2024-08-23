import { useDispatch } from "react-redux";
import { set_create_prebuilt_base_state, set_model_type_to_create, set_page_mode } from "../../Store.tsx";

import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { set_object_selected, set_selected_model_id, set_selected_object_list, set_model_creation_state, set_reset_raid_models,} from "../../Store.tsx"; // prettier-ignore

import overviewRgbThumbnail from "../../icons/overview_rgb_thumbnail.png";
import editRgbThumbnail from "../../icons/hammer_rgb_thumbnail.png";
import raidRgbThumbnail from "../../icons/raid_rgb_thumbnail.png";
import overviewBwThumbnail from "../../icons/overview_bw_thumbnail.png";
import editBwThumbnail from "../../icons/hammer_bw_thumbnail.png";
import raidBwThumbnail from "../../icons/raid_bw_thumbnail.png";
import { useEffect } from "react";

import { AudioPlayer } from "./AudioPlayer.tsx";
import menu_sound from "../../audio/menu_sound.mp3";

//? ----------------------------------------------------------------------------------------------------

//? This component serves as the main navigation tool, allowing users to change the page mode (overview, edit, raid).

//? ----------------------------------------------------------------------------------------------------

const Toolbar = () => {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); //prettier-ignore
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  function ChangePageMode(page_mode: string) {
    setTimeout(() => {
      dispatch(set_page_mode(page_mode));
    }, 10);

    // timeout is required because:
    // 1. model ghost hover in raid mode,
    // 2. switch to edit mode
    // 3. ghost models become textureless and white

    dispatch(set_reset_raid_models(!reset_raid_models));
    dispatch(set_selected_model_id("empty"));
    dispatch(set_object_selected(false));

    if (audio) {
      AudioPlayer(menu_sound);
    }
  }

  // -------------------------  deselect the selected object and disable the model cretion state on page mode change -------------------------

  useEffect(() => {
    {
      dispatch(set_selected_object_list(-1));
      dispatch(set_model_creation_state(false));
      dispatch(set_create_prebuilt_base_state(false));
      dispatch(set_model_type_to_create(""));
    }
  }, [page_mode]);

  return (
    <>
      <div className={"toolbar_container"}>
        <div
          onClick={() => ChangePageMode("overview")}
          className={
            page_mode === "overview"
              ? "toolbar_container_button toolbar_container_button_active"
              : "toolbar_container_button toolbar_container_button_inactive"
          }
        >
          <div
            className="toolbar_container_button_thumbnail"
            style={
              page_mode === "overview"
                ? { backgroundImage: `url(${overviewRgbThumbnail})` }
                : { backgroundImage: `url(${overviewBwThumbnail})` }
            }
          ></div>
          <div className="toolbar_container_button_description">overview</div>
        </div>

        <div
          onClick={() => ChangePageMode("edit")}
          className={
            page_mode === "edit"
              ? "toolbar_container_button toolbar_container_button_active"
              : "toolbar_container_button toolbar_container_button_inactive"
          }
        >
          <div
            className="toolbar_container_button_thumbnail"
            style={
              page_mode === "edit"
                ? { backgroundImage: `url(${editRgbThumbnail})` }
                : { backgroundImage: `url(${editBwThumbnail})` }
            }
          ></div>
          <div className="toolbar_container_button_description">edit</div>
        </div>

        <div
          onClick={() => ChangePageMode("raid")}
          className={
            page_mode === "raid"
              ? "toolbar_container_button toolbar_container_button_active"
              : "toolbar_container_button toolbar_container_button_inactive"
          }
        >
          <div
            className="toolbar_container_button_thumbnail"
            style={
              page_mode === "raid"
                ? { backgroundImage: `url(${raidRgbThumbnail})` }
                : { backgroundImage: `url(${raidBwThumbnail})` }
            }
          ></div>
          <div className="toolbar_container_button_description">raid</div>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
