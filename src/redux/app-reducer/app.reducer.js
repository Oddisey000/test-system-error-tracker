import INITIAL_STATE from "../root.state";
import { 
  SET_HARNESS_LIST,
  SET_XCODE_LIST,
  ACTION_BUTTON_PRESSED,
  SET_DEFAULT_XCODE,
  CLEAR_HARNESS_LIST,
  SET_WIRE_LIST,
  SET_DEFAULT_WIRE
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
    case SET_WIRE_LIST:
      return {
        ...state,
        wireList: action.payload
      };
    case ACTION_BUTTON_PRESSED:
      return {
        ...state,
        actionButtonPressed: action.payload
      };
    case SET_DEFAULT_XCODE:
      return {
        ...state,
        lastXcode: action.payload
      };
    case SET_DEFAULT_WIRE:
      return {
        ...state,
        lastWire: action.payload
      };
    case CLEAR_HARNESS_LIST:
      return {
        ...state,
        harnessList: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;