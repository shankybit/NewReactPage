import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Page from './components/Page.js'
// import NewRegister from './components/NewRegister.js'
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './components/LoginPage.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path='/employeepage' element={<Page />} />
      </Routes>
   
      </BrowserRouter>
    </div>
  );
}

export default App;
