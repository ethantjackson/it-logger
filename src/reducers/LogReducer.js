import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  CLEAR_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  SEARCH_LOGS,
} from '../actions/types';

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
};

const LogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return { ...state, logs: action.payload, loading: false };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false,
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== action.payload),
        loading: false,
      };
    case SET_LOADING:
      return { ...state, loading: true };
    case LOGS_ERROR:
      console.error(action.payload);
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default LogReducer;
