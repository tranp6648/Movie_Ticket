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
import Category_Movie from './components/Category_Movie/Category_Movie';
import Edit from './components/Edit/Edit';
import Cinema from './components/Cinema/Cinema';
import AllMovies from './components/AllMovies/AllMovies';
import Footer from './components/footer/FooterHome';
import Actor from './components/Actor/Actor';
import Detail from './components/Detail/Detail';
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
    <Route path='/Category_Movie' element={<Category_Movie/>}/>
    <Route path='/Edit' element={<Edit/>}/>
    <Route path='/Cinema' element={<Cinema/>}/>
    <Route path='/AllMovie' element={<AllMovies/>}/>
    <Route path='/footer' element={<Footer/>}/>
    <Route path='/actor' element={<Actor/>}/>
    <Route path='/Detail' element={<Detail/>}/>
     </Routes>
   </Router>
  );
}

export default App;
