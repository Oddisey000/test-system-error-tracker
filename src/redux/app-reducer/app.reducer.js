import INITIAL_STATE from "../root.state";
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
    case SET_ERROR_LIST:
      return {
        ...state,
        errorList: action.payload
      };
    case ACTION_BUTTON_PRESSED:
      return {
        ...state,
        actionButtonPressed: action.payload
      };
    case CLEAR_BUTTON_PRESSED:
    return {
      ...state,
      clearButtonPressed: action.payload
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
    case SET_DEFAULT_ERROR:
      return {
        ...state,
        lastError: action.payload
      };
    case CLEAR_HARNESS_LIST:
      return {
        ...state,
        harnessList: action.payload
      };
    case CONTINUOUSLY_CHECK:
    return {
      ...state,
      continuouslyCheck: action.payload
    };
    default:
      return state;
  }
};

export default appReducer;