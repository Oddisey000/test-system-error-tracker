import { 
  SET_HARNESS_LIST,
  SET_XCODE_LIST,
  ACTION_BUTTON_PRESSED,
  SET_DEFAULT_XCODE
} from "./app-reducer.types";

import {
  setHarnessList,
  setXcodeList
} from "./app-reducer.utils";

export const setHarnessListAction = (request) => ({
  type: SET_HARNESS_LIST,
  payload: setHarnessList(request)
});

export const setXcodeListAction = (request) => ({
  type: SET_XCODE_LIST,
  payload: setXcodeList(request)
});

export const setButtonAction = (isPressed) => ({
  type: ACTION_BUTTON_PRESSED,
  payload: isPressed
});

export const setXcodeAction = (xcode) => ({
  type: SET_DEFAULT_XCODE,
  payload: xcode
});
