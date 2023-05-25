import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import data from "./User.json";

export default function Register() {
    const [account, setAccount] =  useState(JSON.parse(localStorage.getItem('users')));
    console.log(account);
    const regis = (e) => {
        e.preventDefault()
        const fullName = document.getElementById('InputName').value;
        const Email = document.getElementById('InputEmail1').value;
        const Password = document.getElementById('InputPassword').value;
        const newaccount = {
            id: account.length + 1,
            role: 0,
            email: Email,
            fullName: fullName,
            password: Password
        }
        setAccount([...account,newaccount]);
        console.log(account);
        // localStorage.setItem('users', JSON.stringify(account));
        localStorage.setItem('users', JSON.stringify([...account, newaccount]))
        alert('Sign Up Success');
        // navigate('/Login');
    }
return (
    <div className="container">
        <div className="row align-items-center justify-content-center ">
            <div className="loginform col-md-12 ">
                <form onSubmit={regis} >
                    <h3 className="">Register</h3>
                    <div className="form-group">
                        <label for="InputEmail1">Email address</label>
                        <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="InputName">Username</label>
                        <input type="text" className="form-control" id="InputName" required placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label for="InputPassword1">Password</label>
                        <input type="password" className="form-control" id="InputPassword" required placeholder="Enter password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    </div>
)
}