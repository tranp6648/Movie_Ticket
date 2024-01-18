import logo from './logo.svg';
import './App.css';
import HomePillDetail from './components/HomePillDetail';
import AddPillDetail from './components/AddPillDetail';
import { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
   <Router>
     <Routes>
      <Route path='/' element={<HomePillDetail/>}/>
      <Route path='/Add' element={<AddPillDetail/>}/>
     </Routes>
   </Router>
  );
}

export default App;
