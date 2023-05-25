import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
// import data from "./User.json";
import './style.css';

export default function Login() {
    const [account, setAccount] =  useState(JSON.parse(localStorage.getItem('users')));
    console.log(account);
    let navigate = useNavigate();

    const checkAccount = () => {
        const email = document.getElementById('InputEmail1').value;
        const password = document.getElementById('InputPassword').value;
        const checkAccount = account.filter((a) => a.email === email && a.password === password);
        if (checkAccount.length > 0) {
            localStorage.setItem('Account', JSON.stringify(checkAccount));
            navigate('/');
        }
        else {
            alert("Tên tài khoản hoặc mật khẩu không đúng !!!")
        }
    }
    return (
        <div className="back-ground">
            <div className="login">
            <div className="login_form">
                <div className="login_title">Login System</div>
                <div className="login_input">
                    <label>Email:</label>
                    <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="login_input">
                    <label>Password:</label>
                    <input type="password" className="form-control" id="InputPassword" placeholder="Enter password" />
                </div>
                <div className="login_link">
                <Link to="/register" >Create a account ?</Link>
                </div>
                <div className="login_button">
                    <button type="button" className="btn btn-primary" onClick={checkAccount}>Login</button>
                </div>
            </div>
        </div>
        </div>
    )
}