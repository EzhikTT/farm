import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './pages/Game/Game';
import {BrowserRouter, Routes, Route} from 'react-router'
import Main from './pages/Main/Main';
import Authorization from './pages/Authorzation/Authorization';
import Creators from './pages/Creators/Creators';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <div className='main'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/game' element={<Game/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/auth' element={<Authorization/>}/>
          <Route path='/creators' element={<Creators/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
