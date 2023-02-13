import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { TodoPage } from './app/pages/todo_page';
import { Provider } from 'react-redux';
import { store } from './app/boot';

function App() {
  return (
    <Provider store={store}>
      <TodoPage />
    </Provider>
  );
}

export default App;
