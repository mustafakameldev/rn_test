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
it('shows invalid user name error message', () => {
  const { getByTextId, getByText, queryAllByText } = render(<SignIn />);
  fireEvent.changeText(getByTextId('SignIn.passwordInput'), '00000');
  fireEvent.press(getByTextId('SignIn.Button'));
  getByText('Invalid username.');
});
