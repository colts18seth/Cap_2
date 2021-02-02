import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './Login.css';
import { login, signUp } from "../actions/actionCreators";

function Login() {
    const dispatch = useDispatch();
    let history = useHistory();
    const INITIAL_STATE = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: ""
    }

    const [data, setData] = useState(INITIAL_STATE);
    const [error, setError] = useState(false);
    const [activeForm, setActiveForm] = useState('login')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(data => ({
            ...data,
            [name]: value
        }));
        setError(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const post = { data: data }
            if (activeForm === "login") {
                await dispatch(login(post.data));
            } else {
                await dispatch(signUp(post.data));
            }
            setError(false);
            setData(INITIAL_STATE);
            history.push("/");
        }
        catch {
            setError(true);
        }
    }

    const handleActiveForm = (e) => {
        const loginButton = document.getElementById('loginButton');
        const signUpButton = document.getElementById('signUpButton');
        const clicked = e.target;
        if (clicked.classList.contains('active')) {
            return
        } else if (clicked === loginButton) {
            loginButton.classList.add('active');
            signUpButton.classList.remove('active');
            setActiveForm('login');
        } else {
            signUpButton.classList.add('active');
            loginButton.classList.remove('active');
            setActiveForm('signUp');
        }
    }

    return (
        <>
            <div className='buttons'>
                <button id='loginButton' className='loginButton active' type='button' onClick={handleActiveForm}>Login</button>
                <button id='signUpButton' className='signUpButton' type='button' onClick={handleActiveForm}>Sign-Up</button>
            </div>

            <form className="SignIn rounded-3" onSubmit={handleSubmit}>
                {activeForm === 'login' ?
                    <h2 className="text-center mb-3 pt-2">Login</h2> :
                    <h2 className="text-center mb-3 pt-2">Sign-Up</h2>
                }
                {error && <p className="error">Invalid Credentials!</p>}
                <div>
                    <label htmlFor="username">Username: </label>
                    <input onChange={handleChange} name="username" id="username" type="text" value={data.username}></input>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input onChange={handleChange} name="password" id="password" type="password" value={data.password}></input>
                </div>
                {activeForm === 'signUp' &&
                    <>
                        <div>
                            <label htmlFor="first_name">First Name: </label>
                            <input onChange={handleChange} name="first_name" id="first_name" type="text" value={data.first_name}></input>
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name: </label>
                            <input onChange={handleChange} name="last_name" id="last_name" type="text" value={data.last_name}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input onChange={handleChange} name="email" id="email" type="text" value={data.email}></input>
                        </div>
                    </>
                }
                <span className="d-flex">
                    <button className="justify-content-center" type="submit">Submit</button>
                </span>
            </form>
        </>
    );
};

export default Login;