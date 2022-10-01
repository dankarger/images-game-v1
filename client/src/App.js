import React  from "react";
import HomePage from "./HomePage/HomePage";
import NavBAr from "./components/NavBar/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <NavBAr />
    <Routes>
      <Route path='/'  element={<HomePage />} />
      <Route path='/home'  element={<HomePage />} />

    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
