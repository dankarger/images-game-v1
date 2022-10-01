import React  from "react";
import HomePage from "./Pages/HomePage/HomePage";
import About from "./Pages/About/About";
import DrawerAppBar  from "./components/NavBar/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <DrawerAppBar />
    <Routes>
      <Route path='/'  element={<HomePage />} />
      <Route path='/Home'  element={<HomePage />} />
        <Route path='/About'  element={<About />} />

    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
