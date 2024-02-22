import INITIAL_STATE from "../root.state";
import { 
  SET_HARNESS_LIST,
  SET_XCODE_LIST
} from "./app-reducer.types";

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_HARNESS_LIST:
      return {
        ...state,
        harnessList: action.payload
      };
    case SET_XCODE_LIST:
      return {
        ...state,
        xcodeList: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;