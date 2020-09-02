import React, { useState } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import RecordWorkouts from './components/records/RecordWorkouts';
import Home from './components/Home';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Axios from 'axios';
import { useEffect } from 'react';
import { decode } from "jsonwebtoken";
const URL = process.env.REACT_APP_URL;


function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState(null);

    let getUserProfile = (token) => {
        // console.log(`TOKEN??:: ${token}`)
        //AXIOS GET , return user details
        Axios.get(`${URL}/auth/user`, { headers: { "x-auth-token": token } })
            .then((res) => {
                setIsAuth(true);
                setUser(res.data.user);
                console.log(res.data.user);
            }).catch((err) => {
                console.log(err)
            })


    }

    let loginHandler = (credentials) => {
        Axios.post(`${URL}/auth/login`, credentials)
            .then((res) => {
                localStorage.setItem("token", res.data.token)
                getUserProfile(res.data.token);
                setIsAuth(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let logoutHandler = () => {

    }

    useEffect(
        () => {
            let token = localStorage.getItem("token");
            if (!(token == null)) {
                //Get user profile each time page reloads
                let decodedToken = decode(token);
                if (!decodedToken) {
                    localStorage.removeItem("token");
                } else {
                    getUserProfile(token);
                }
            }
        }, []
    );


    return (
        <div
        // id="outer-container"
        >
            <Router>
                <Navigation isAuth={isAuth} />
                <div className="top__right font-italic">{ user && (`@${user.username}`)}</div>
                <div
                    // id="page-wrap"
                    className="pt-5"
                >
                    <Switch>
                        <Container>
                            <Route path="/" exact>
                                <Home
                                    user={user}
                                    isAuth={isAuth}
                                />
                            </Route>
                            <Route path="/records">
                                <RecordWorkouts />
                            </Route>
                            <Route path="/register" exact>
                                <Register />
                            </Route>
                            <Route path="/login" exact>
                                {
                                    isAuth ? <Home
                                        user={user}
                                        isAuth={isAuth}
                                    />
                                        : <Login
                                            loginHandler={loginHandler}
                                        />
                                }

                            </Route>
                        </Container>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
