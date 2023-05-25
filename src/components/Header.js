// import movie from "./Movies.json"
import 'bootstrap/dist/css/bootstrap.min.css';

import "./style.css"
function Header() {
    return (
        <header className="container-fluid">
            <nav className="navbar navbar-light bg-light">
                <div>
                <a className="navbar-brand">Phim Hay</a>
                </div>
                <form className="form-inline d-flex">
                    <input className="form-control " type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success " type="submit">Search</button>
                    <a href = "#"><button className="btn btn-outline-primary" type="button">Login</button></a>
                    <a href = "#"><button className="btn btn-outline-danger" type="button">SignUp</button></a>
                </form>
            </nav>
        </header>
    )
}
export default Header;