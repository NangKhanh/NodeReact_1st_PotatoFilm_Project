import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
// import data from "./User.json";
import './addMovies.css'
function AddMovies() {
    // const [movie, setMovie] = useState(JSON.parse(localStorage.getItem('movies')));
    // console.log(movie);
    // const handleAddMovies = () => {
    //     const title = document.getElementById('txttitle').value
    //     const detail = document.getElementById('txtdetail').value
    //     const category = document.getElementById('txtcategory').value
    //     const year = document.getElementById('txtyear').value
    //     const thumbnail = document.getElementById('txtthumnail').value
    //     const image = document.getElementById('txtimage').value
    //     let lastId = 0;
        
    //     console.log(movie);
    //     movie.forEach((p) => {
    //         lastId = p.id
    //     });
    //     const newMovies = {
    //         id: lastId + 1,
    //         category: category,
    //         year: year,
    //         title: title,
    //         detail: detail,
    //         url: image,
    //         thumbnailUrl: thumbnail,
    //         votes: [
    //             {
    //                 uid : null,
    //                 rate : null,
    //                 comment : null
    //             }
    //         ]
    //       }
    //       setMovie(...movie,newMovies)
    //       console.log(movie);
    // }
    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="login_title">Add a new movie</div>
                    <div className="login_input">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder="Enter title" id="txttitle" />
                    </div>
                    <div className="login_input">
                        <label>Detail</label>
                        <input type="text" className="form-control" placeholder="Enter Detail" id="txtdetail" />
                    </div>
                    <div className="login_input">
                        <label>Year</label>
                        <input type="number" className="form-control" placeholder="Enter Year" id="txtyear" />
                    </div>
                    <div className="login_input">
                        <label>category</label>
                        <input type="text" className="form-control" placeholder="Enter category" id="txtcategory" />
                    </div>
                    <div className="login_input">
                        <label>thumbnail</label>
                        <input type="text" className="form-control" placeholder="Enter url of thumnail" id="txtthumnail" />
                    </div>
                    <div className="login_input">
                        <label>Detail image</label>
                        <input type="text" className="form-control" placeholder="Enter url of movies" id="txtimage" />
                    </div>
                    <div className="login_input">
                        <button type="button" className="btn btn-primary" >Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMovies