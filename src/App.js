import { HashRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';

import MainContainer from './components/main-container/main.container.component';

function App() {
  return (
    <HashRouter basename="/">
    <Routes>
      <Route Component={MainContainer} exact path='/'></Route>
    </Routes>
  </HashRouter>
  );
}

export default App;
