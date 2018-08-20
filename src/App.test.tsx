import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { validEmail } from './components/Form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('correctly validates email input', () => {
  expect(validEmail('')).toEqual(false);
  expect(validEmail('email@')).toEqual(false);
  expect(validEmail('email@domain')).toEqual(false);
  expect(validEmail('email@domain.io')).toEqual(true);
});
