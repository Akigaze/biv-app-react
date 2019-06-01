import {CHANGE_CURRENT_VIEW} from "../constant/app-action-type";

export const changeActiveView = (view) => {
  return {type: CHANGE_CURRENT_VIEW, payload:{view}}
};