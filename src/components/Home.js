import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

function Home() {
  const [movie, setMovie] = useState([]);
  const [movieInterface, setMovieInterface] = useState([]);
  const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('Account')));
  useEffect(() => {
    setMovie(JSON.parse(localStorage.getItem('movies')));
    setMovieInterface(JSON.parse(localStorage.getItem('movies')));
  }, []);

  const uniqueCategories = movie.filter((item, index, self) =>
    index === self.findIndex((t) => t.category === item.category)
  );

  const handleFilter = (category) => {
    setMovieInterface(movie.filter(p => p.category === category))
  }
  const handleFilterAll = () => {
    setMovieInterface(movie)
  }
  const handleSearchMovies = () => {
    let searchVal = document.getElementById("searchVal").value
    let searchResult = movie.filter(p => p.title.toLowerCase().includes(searchVal.toLowerCase()))
    if (searchVal === '')
      setMovieInterface(movie)
    else
      setMovieInterface(searchResult)
  }
  let check = 0
  console.log(localUser);
  if (localUser)
    if (localUser[0].role === 1)
      check = 1
  const handlerDelteMovie = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa phim này?")) {
      setMovieInterface(prevMovies => prevMovies.filter(p => p.id !== id));
      setMovie(prevMovies => prevMovies.filter(p => p.id !== id));
      console.log(movie);
      localStorage.setItem('movies', JSON.stringify(movieInterface));
    }
  }
  return (
    <div>
      <header className="container-fluid">
        <nav className="navbar navbar-light bg-light">
          <div>
            <a href="/" className="navbar-brand">Phim Hay</a>
          </div>
          <div className="form-inline d-flex">
            <input className="form-control " id="searchVal" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success " type="button" onClick={handleSearchMovies}>Search</button>
            {localUser ? (
              <div className="userName d-flex">
                <strong>{localUser[0].fullName}</strong>
                {localUser[0].role === 1 && (
                  <Link to="/addMovie" className="btn btn-outline-primary ml-2" type="button">Edit</Link>
                )}
                <button className="btn btn-outline-danger" type="button" onClick={() => { setLocalUser(null); window.localStorage.removeItem('Account'); }}>Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login"><button className="btn btn-outline-primary" type="button">Login</button></Link>
                <Link to="/register"><button className="btn btn-outline-danger" type="button">SignUp</button></Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <div className="container row">
        <div className="left col-3">
          <h3>Thể Loại</h3>
          <ul>
            {uniqueCategories.map((p) => (
              <li onClick={() => handleFilter(p.category)} className="text-dark categories" key={p.id}>
                {p.category}
              </li>
            ))}
            <li className="text-dark categories" onClick={handleFilterAll} >Tất cả</li>
          </ul>
        </div>
        <div className="left col-9">
          <div className="row">
            {
              movieInterface.map((p) => (
                <div className="col-md-4 cardelement">
                  <div className="card_img">
                    <img src={p.thumbnaiUrl} alt="anh" />
                  </div>
                  <h4><div className="card_title">{p.title}</div></h4>
                  <div className="card_title"><strong>Năm</strong> {p.year}</div>
                  <div className="card_title"><strong>Loại</strong>: {p.category}</div>
                  <div className="card_title">
                    <p><strong>Điểm:</strong> {Number((p.votes.reduce((total, vote) => total + vote.rate, 0) / p.votes.length).toFixed(2))}</p>
                  </div>
                  <Link to={`/detail/${p?.id}`} class="btn btn-primary">Đánh Giá</Link>
                  {check === 1 && (
                    <button className="btn btn-danger" type="button" onClick={() => handlerDelteMovie(p.id)}>Delete</button>
                  )}
                </div>
              ))
            }
          </div>
          <div className="card">
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
