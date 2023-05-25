import './App.css';
import Home from './components/Home';
import Login from "./components/Login";
import AddMovies from "./components/AddMovies";
import Register from "./components/Register";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
import Detail from './components/Detail';
import moviesData from "./Movies.json";
import userData from "./User.json"
export const UserContent = createContext();

// localStorage.setItem('movies', JSON.stringify(moviesData));
if (!localStorage.getItem('movies')) {
  localStorage.setItem('movies', JSON.stringify(moviesData));
}
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(userData));
}

//localStorage.clear() clear storage
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='detail/:slug' element={<Detail/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/addMovie' element={<AddMovies/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

      </Routes>
    </div>
    
  )
}

export default App;
