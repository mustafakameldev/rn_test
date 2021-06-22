import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import jest from 'jest-mock';
import SignIn from '../SignIn';
const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));
it('render default elemetns ', () => {
  const { getAllByText, getByPlaceholderText } = render(<SignIn />);
  expect(getAllByText('Login').length).toBe(2);
  getByPlaceholderText('type username');
  getByPlaceholderText('type password');
});
it('Show invalid input messages ', () => {
  const { getByTestId, getByText } = render(<SignIn />);
  fireEvent.press(getByTestId('SignIn.Button'));
  getByText('Invalid username.');
  getByText('Invalid password.');
});
it('shows invalid user name error message', () => {
  const { getByTestId, getByText, queryAllByText } = render(<SignIn />);
  fireEvent.changeText(getByTestId('SignIn.passwordInput'), '00000');
  fireEvent.press(getByTestId('SignIn.Button'));
  getByText('Invalid username.');
  expect(queryAllByText('invalid passsword.').length).toBe(0);
  fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'invalid input');
  getByText('Invalid username.');
  expect(queryAllByText('invalid password.').length).toBe(0);
});
it('Show  invalid password error message', () => {
  const { getByTestId, getByText, queryAllByText } = render(<SignIn />);
  fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'example');
  fireEvent.press(getByTestId('SignIn.Button'));
  getByText('Invalid password.');
});
