import { 
  SET_HARNESS_LIST
} from "./app-reducer.types";

import {
  setHarnessList
} from "./app-reducer.utils";

export const setHarnessListAction = (request) => ({
  type: SET_HARNESS_LIST,
  payload: setHarnessList(request)
});
