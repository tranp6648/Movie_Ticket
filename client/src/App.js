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
import Layout from './components/Layout/layout';
import Homepage from './components/Homepage/Homepage';
import Actor from './components/Actor/Actor';
import Detail from './components/Detail/Detail';
import MovieActor from './components/MovieActor/MovieActor';
import DetailActor from './components/DetailActor/DetailActor';
import Cart from './components/Cart/Cart';
import ShowTimes from './components/Showtimes/ShowTimesMovie';
import Event from './components/Event/Event';
import EventHome from './components/EventHome/EventHome';
import Superadmin from './components/Superadmin/Superadmin';
import CreateCinema from './components/Superadmin/createCinema/CreateCinema';
import HomeSuperadmin from './components/Superadmin/HomeSuperadmin';
import DetailCinema from './components/Superadmin/DetailCinema/DetailCinema';
import DetailEvent from './components/DetailEvent/DetailEvent';
import Forgot from './components/Forgot/Forgot';
import Voucher from './components/Voucher/Voucher';
import CheckOutCart from './components/Checkout/CheckOutCart';
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
    <Route path='/layout' element={<Layout/>}>
      <Route index element={<Homepage/>}/>
    </Route>
    <Route path='/superadmin/' element={<Superadmin/>}>
      <Route index element={<HomeSuperadmin/>}/>
      <Route path='createCinema' element={<CreateCinema/>}/>
      <Route path='detailCinema' element={<DetailCinema/>}/>


    </Route>
    <Route path='/actor' element={<Actor/>}/>
    <Route path='/Detail/:id' element={<Detail/>}/>
    <Route path='/MovieActor' element={<MovieActor/>}/>
    <Route path='/DetailActor/:id' element={<DetailActor/>}/>
    <Route path='/Cart/:id' element={<Cart/>}/>
    <Route path='/Showtimes' element={<ShowTimes/>}/>
    <Route path='/Event' element={<Event/>}/>
    <Route path='/EventHome' element={<EventHome/>}/>
    <Route path='/DetailEvent/:id' element={<DetailEvent/>}/>
    <Route path='/Forgot' element={<Forgot/>}/>
    <Route path='/Voucher' element={<Voucher/>}/>
    <Route path='/CheckOut' element={<CheckOutCart/>}/>
     </Routes>
   </Router>
  );
}

export default App;
