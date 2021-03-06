import React, { useState } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
import Home from './components/Home';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Axios from 'axios';
import { useEffect } from 'react';
import { decode } from "jsonwebtoken";
import WorkoutDisplay from './components/workout/WorkoutDisplay';
import Calculator from './components/calculator/Calculator';
import QRShare from './components/social/QRShare';
import Groups from './components/social/Groups';
const URL = process.env.REACT_APP_URL;


function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState(null);
    const [currentWorkout, setCurrentWorkout ] = useState({});
    const [loginError, setLoginError] = useState("");
    
    let getUserProfile = (token) => {
        // console.log(`TOKEN??:: ${token}`)
        //AXIOS GET , return user details
        Axios.get(`${URL}/auth/user`, { headers: { "x-auth-token": token } })
            .then((res) => {
                setIsAuth(true);
                setUser(res.data.user);
                console.log("RESDATAUSER")
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
                setLoginError("");
            })
            .catch((err) => {
                console.log("ERROR HERE")
                console.log(err);
                setLoginError(err.response.data.message)
            })
    }

    let logoutHandler = () => {
        localStorage.clear("token")
        setIsAuth(false);
        setUser(null);
    }


    let refreshToken = () => {
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
        console.log(currentWorkout);
    }

    // refreshToken();

    useEffect(
        () => {
            refreshToken();
        }, [isAuth]
    );
    

    
        //IF IS AUTH, FETCH USER PBS
        console.log(`IS AUTH: ${isAuth}`)

    return (
        <div
        // id="outer-container"
        >
            <Router>
                <Navigation 
                    isAuth={isAuth} 
                    logoutHandler = {logoutHandler}
                    />
                <div className="top__right font-italic">{ user && (`@${user.username}`)}</div>
                <div
                    // id="page-wrap"
                    className="pt-5"
                >
                    <Switch>
                        <Container>
                            <Route path="/home" exact>
                                <Home
                                    user={user}
                                    isAuth={isAuth}
                                    setCurrentWorkout={setCurrentWorkout}
                                />
                            </Route>
                            <Route path="/workout">
                                <WorkoutDisplay
                                    currentWorkout = {currentWorkout}
                                 />
                            </Route>
                            <Route path="/register" exact>
                                <Register />
                            </Route>
                            <Route path="/login" exact>
                                {
                                    isAuth ? <Home
                                        user={user}
                                        isAuth={isAuth}
                                        setCurrentWorkout={setCurrentWorkout}
                                    />
                                        : <Login
                                            loginHandler={loginHandler}
                                            loginError={loginError}
                                        />
                                }
                            </Route>
                            <Route path="/calculator">
                                <Calculator />
                            </Route>
                            <Route path="/share">
                                <QRShare />
                            </Route>
                            <Route path="/groups">
                                <Groups />
                            </Route>
                            <Route path="/" exact>
                                <Home
                                    user={user}
                                    isAuth={isAuth}
                                    setCurrentWorkout={setCurrentWorkout}
                                />
                            </Route>
                        </Container>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
