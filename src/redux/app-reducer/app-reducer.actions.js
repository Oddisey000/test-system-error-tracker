import { 
  SET_HARNESS_LIST,
  SET_XCODE_LIST
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
