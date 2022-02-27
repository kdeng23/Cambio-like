import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OldGame from './pages/OldGame';
//import NewGame from './pages/NewGame';
import Home from './pages/Home'
import Error from './pages/Error'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<OldGame />} />
        <Route component={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

