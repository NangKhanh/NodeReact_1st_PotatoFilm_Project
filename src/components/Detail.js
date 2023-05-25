import { useParams } from "react-router-dom";
//import user from "./User.json"
import "./style.css"
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react"


function Detail() {
    const [user, setUser] =  useState(JSON.parse(localStorage.getItem('users')));
    let { slug } = useParams();
    let id = parseInt(slug)
    console.log(slug);
    const [moviesData, setMovieData] = useState(JSON.parse(localStorage.getItem('movies')));
    const movieInterface = moviesData.filter(p => p.id === id)
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('Account')));
    const [isComment, setIsComment] = useState(false)
    const [currentComment, setCurrentComment] = useState('')
    const [currentRate, setCurrentRate] = useState('');


    useEffect(() => {
        if (localUser !== null) {
            movieInterface[0].votes.map(votes => {
                if (votes.uid === localUser[0].id) {
                    const index1 = movieInterface[0].votes.findIndex(e => e.uid = localUser[0].id);
                    setIsComment(true);
                    setCurrentComment(movieInterface[0].votes[index1].comment);
                    setCurrentRate(movieInterface[0].votes[index1].rate);
                }
                return null;
            })
        }
    },[])

    const comment = useRef()
    const score = useRef()

    const handleAdd = () => {
        const cmt = comment.current.value;
        const diem = parseInt(score.current.value);
        const newvotes = [...movieInterface[0].votes, {
            uid: localUser[0].id,
            rate: diem,
            comment: cmt
        }]
        console.log(newvotes);
        let tempmovie = [...moviesData, {
            id: movieInterface[0].id,
            category: movieInterface[0].category,
            year: movieInterface[0].year,
            title: movieInterface[0].title,
            detail: movieInterface[0].detail,
            url: movieInterface[0].url,
            thumbnaiUrl: movieInterface[0].thumbnaiUrl,
            votes: newvotes
        }]
        const index = tempmovie.findIndex(e => e.id === movieInterface[0].id);
        tempmovie.splice(index,1)
        // let tempmovie = [...moviesData]
         tempmovie.sort((a,b) => a.id - b.id);
        
    
    //    tempmovie.forEach(tempmovie => {
    //     tempmovie.votes.sort((a,b) => parseInt(a.uid) - parseInt(b.uid))
    //    })
        
        localStorage.removeItem('movies');
        localStorage.setItem('movies', JSON.stringify(tempmovie));
        setMovieData(tempmovie);
        console.log(tempmovie)
    }

    const handleEdit = () => {
        const cmt = comment.current.value;
        const diem = parseInt(score.current.value);
        const newvotes = movieInterface[0].votes.map(votes => {
            if (votes.uid === localUser[0].id) {
                votes.comment = cmt;
                votes.rate = diem
            }
            return votes
        });
        let tempmovie = [...moviesData]
        localStorage.setItem('movies', JSON.stringify(tempmovie))
        setMovieData(tempmovie);
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
                        <button className="btn btn-outline-success " type="button" >Search</button>
                        {localUser ? (
                            <div className="userName d-flex">
                                <strong>{localUser[0].fullName}</strong>
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
                <div className="col-md-6">
                    {
                        movieInterface.map((p) => (
                            <div className="card_img">
                                <img src={p.url} alt="anh" />
                            </div>
                        ))
                    }
                </div>
                <div className="col-md-6 ">
                    <div className="row ">
                        <div className="detail">
                            {
                                isComment === false ?
                                    <>
                                        {
                                            movieInterface.map((p) => (
                                                <div className="col-md">
                                                    <div>
                                                        <h2>{p.title}</h2>
                                                        <div><strong>Thể Loại: </strong>{p.category}</div>
                                                        <div>
                                                            <p><strong>Điểm đánh giá:</strong> {Number((p.votes.reduce((total, vote) => total + vote.rate, 0) / p.votes.length).toFixed(2))}</p>
                                                        </div>
                                                        <div>
                                                            <strong>Mô tả</strong> <span id="diem">{p.detail}</span>
                                                        </div>
                                                        <form>
                                                            <div className="vote">
                                                                <h3>Chi tiết đánh giá :</h3>
                                                                Điểm đánh giá : <input type="number" min="0" max="10" ref={score} required />
                                                                {/* <select>
                                                                    <option
                                                                </select> */}
                                                                <br />Bình luận :<br />
                                                                <textarea className="form-control" ref={comment} required></textarea>
                                                                <br />
                                                                {localUser ? (
                                                                    <><a className="btn btn-primary" onClick={handleAdd}>Đánh Giá</a></>
                                                                ) : (
                                                                    <><Link to="/login" className="btn btn-primary">Đánh Giá</Link> </>
                                                                )

                                                                }
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                    : ''
                            }
                            {
                                isComment === true ?
                                    <>
                                        {
                                            movieInterface.map((p) => (
                                                <div className="col-md">
                                                    <div>
                                                        <h2>{p.title}</h2>
                                                        <div><strong>Thể Loại: </strong>{p.category}</div>
                                                        <div>
                                                            <p><strong>Điểm đánh giá:</strong> {Number((p.votes.reduce((total, vote) => total + vote.rate, 0) / p.votes.length).toFixed(2))}</p>
                                                        </div>
                                                        <div>
                                                            <strong>Mô tả</strong> <span id="diem">{p.detail}</span>
                                                        </div>
                                                        <form>
                                                            <div className="vote">
                                                                <h3>Chi tiết đánh giá :</h3>
                                                                Điểm đánh giá : <input defaultValue={currentRate} type="number" min="0" max="10" ref={score} />{ }
                                                                <br />Bình luận :<br />
                                                                <textarea className="form-control" defaultValue={currentComment} ref={comment}></textarea>
                                                                <br />
                                                                {localUser ? (
                                                                    <><a className="btn btn-primary" onClick={handleEdit}>Chỉnh sửa</a></>
                                                                ) : (
                                                                    <><Link to="/login" className="btn btn-primary">Đánh Giá</Link> </>
                                                                )

                                                                }
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                    : ''
                            }
                        </div>

                        <div className="comment">
                            <h2>Bình Luận</h2>
                            {movieInterface[0].votes.map((vote, index) => {
                                const userFiltered = user.filter(u => u.id === vote.uid);
                                const userName = userFiltered[0].fullName;
                                return (
                                    <div key={index} className='d-flex'>
                                        <p>
                                            <strong>{userName} :</strong> {vote.comment}
                                        </p>
                                        
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail