import logo from './logo.svg';
import './App.css';
import React from 'react';
import HomePillDetail from './components/HomePillDetail';
import AddPillDetail from './components/AddPillDetail';
import Account from './components/Account/Account';
import { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Genre from './components/Genre/Genre';
import AdminPage from '../src/components/Admin/AdminPage';
import Movie from './components/Movie/Movie';
import Accountweb from './components/Account/Account';

function App() {
  return (
   <Router>
     <Routes>
      <Route path='/' element={<HomePillDetail/>}/>
      <Route path='/Add' element={<AddPillDetail/>}/>
      <Route path='/Menu' element={<Menu/>}/>
    <Route path='/Account' element={<Accountweb/>}/>
    <Route path='/Admin' element={<AdminPage/>}/>
    <Route path='/Movie' element={<Movie/>}/>
    <Route path='/Genre' element={<Genre/>}/>
     </Routes>
   </Router>
  );
}

export default App;
