import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it("render correclty", ()=>{
  const {queryByTestId, queryPlaceholderName} = render(<App/>)
  
  expect(queryByTestId("search-button")).toBeTruthy();
  expect(queryByTestId("search-bar")).toBeTruthy();
})