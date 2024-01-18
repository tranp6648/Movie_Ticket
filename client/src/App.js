import logo from './logo.svg';
import './App.css';
import HomePillDetail from './components/HomePillDetail';
import AddPillDetail from './components/AddPillDetail';
import Account from './components/Account/Account';
import { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Accountweb from './components/Account/Account';
function App() {
  return (
   <Router>
     <Routes>
      <Route path='/' element={<HomePillDetail/>}/>
      <Route path='/Add' element={<AddPillDetail/>}/>
      <Route path='/Menu' element={<Menu/>}/>
    <Route path='/Account' element={<Accountweb/>}/>
     </Routes>
   </Router>
  );
}

export default App;
