import sagaHelper from 'redux-saga-testing';
import { call, put, select } from 'redux-saga/effects';

const authApi = jest.fn();
const logedInSucess = (payload) => {
  return {
    type: 'LOGEDIN_SUCCESS',
    payload,
  };
};
const logedInField = (error) => {
  return {
    type: 'LOGEDIN_FAILED',
    payload: error,
  };
};
const dataEmpty = () => ({ type: 'SOME_ACTION_EMPTY' });
const user = (state) => state.user;
function* login(form) {
  try {
    const userData = yield select(user);
    const data = yield call(authApi, input);
    yield put(loginSuccess(data));
  } catch (e) {
    yield put(loginFailed(e));
  }
}
