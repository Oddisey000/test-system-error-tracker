import { 
  SET_HARNESS_LIST,
  SET_XCODE_LIST,
  ACTION_BUTTON_PRESSED,
  SET_DEFAULT_XCODE,
  CLEAR_HARNESS_LIST,
  SET_WIRE_LIST,
  SET_DEFAULT_WIRE,
  SET_ERROR_LIST,
  SET_DEFAULT_ERROR,
  CLEAR_BUTTON_PRESSED,
  CONTINUOUSLY_CHECK
} from "./app-reducer.types";

import {
  setHarnessList,
  setXcodeList,
  setWireList,
  setErrorList
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

export const setButtonClearAction = (isPressed) => ({
  type: CLEAR_BUTTON_PRESSED,
  payload: isPressed
});

export const setContinuouslyCheckAction = (isIntervalCheck) => ({
  type: CONTINUOUSLY_CHECK,
  payload: isIntervalCheck
});

export const setXcodeAction = (xcode) => ({
  type: SET_DEFAULT_XCODE,
  payload: xcode
});

export const setWireAction = (wire) => ({
  type: SET_DEFAULT_WIRE,
  payload: wire
});

export const setErrorAction = (error) => ({
  type: SET_DEFAULT_ERROR,
  payload: error
});

export const clearHarnessListAction = () => ({
  type: CLEAR_HARNESS_LIST,
  payload: []
});

export const setWireListAction = (request) => ({
  type: SET_WIRE_LIST,
  payload: setWireList(request)
});

export const setErrorListAction = (request) => ({
  type: SET_ERROR_LIST,
  payload: setErrorList(request)
});
