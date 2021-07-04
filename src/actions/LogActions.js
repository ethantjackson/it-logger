import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_LOADING,
  UPDATE_LOG,
  LOGS_ERROR,
  SEARCH_LOGS,
} from './types';

// export const getLogs = () => {
//   return async (dispatch) => {
//     try {
//       setLoading();

//       const res = await fetch('/logs');
//       const data = await res.json();

//       dispatch({
//         type: GET_LOGS,
//         payload: data,
//       });
//     } catch (err) {
//       dispatch({
//         type: LOGS_ERROR,
//         payload: err.response.data,
//       });
//     }
//   };
// };

export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('/logs');
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();

    var formBody = [];
    for (var property in log) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(log[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    const res = await fetch('/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

export const deleteLog = (_id) => async (dispatch) => {
  try {
    setLoading();
    await fetch('/logs/' + _id, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_LOG,
      payload: _id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

export const updateLog = (log) => async (dispatch) => {
  try {
    var formBody = [];
    for (var property in log) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(log[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    const res = await fetch('/logs/' + log._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    });
    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

export const searchLogs = (param) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch('/logs/?q=' + param);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
