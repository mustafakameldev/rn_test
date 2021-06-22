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
    const data = yield call(authApi, form);
    yield put(logedInSucess(data));
  } catch (e) {
    yield put(logedInField(form));
  }
}
describe('testing login saga', () => {
  describe('Scenario 1 :  success', () => {
    const it = sagaHelper(
      login({ email: 'mospro20@gmail.com', password: '12345678' })
    );
    it('should get an success message', (result) => {
      expect(result).toEqual(select(user));
      return 'loged';
    });
    it('should have called the mock Api first ', (result) => {
      expect(result).toEqual(
        call(authApi, { email: 'mospro20@gmail.com', password: '12345678' })
      );
      return { email: 'mospro20@gmail.com', password: '12345678' };
    });
    it('call the action', (result) => {
      expect(result).toEqual(
        put(
          logedInSucess({ email: 'mospro20@gmail.com', password: '12345678' })
        )
      );
    });
    it('and then no thing', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
describe('Sernario 2 :  failed ', () => {
  const it = sagaHelper(login({ email: 'mospro' }));
  it('get the form  ', (result) => {
    expect(result).toEqual(select(user));
    return { email: 'mospro', password: '00000000' };
  });
  it('called the mock api', (result) => {
    expect(result).toEqual(call(authApi, { email: 'mospro' }));
    return new Error('something went wrong');
  });
  it('then get the data', (result) => {
    expect(result).toEqual(put(logedInField({ email: 'mospro' })));
  });

  // it('and then nothing', (result) => {
  //   expect(result).toBeUndefined();
  // });
});

describe('Scenario 3 :  The Api is broken', () => {
  const it = sagaHelper(
    login({ email: 'mospro20@gmail.com', password: '12345678' })
  );
});
