import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR,
  SET_LOADING,
} from '../actions/types';

export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('/techs');
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.data,
    });
  }
};

export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();

    var formBody = [];
    for (var property in tech) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(tech[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    const res = await fetch('/techs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    });
    const data = await res.json();

    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.data,
    });
  }
};

export const deleteTech = (_id) => async (dispatch) => {
  try {
    setLoading();

    await fetch('/techs/' + _id, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_TECH,
      payload: _id,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.data,
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
