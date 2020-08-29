import React, { useState } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Workouts from './components/records/RecordWorkouts';
import Home from './components/Home';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Axios from 'axios';
const URL = process.env.REACT_APP_URL;


function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState(null);

    let loginHandler = (credentials) => {
        Axios.post(`${URL}/auth/login`, credentials)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
                setIsAuth(true);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
    }

    return (
        <div
        // id="outer-container"
        >
            <Router>
                <Navigation />
                <div
                    // id="page-wrap"
                    className="pt-5"
                >
                    <Switch>
                        <Container>
                            <Route path="/workouts">
                                <Workouts />
                            </Route>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/register" exact>
                                <Register />
                            </Route>
                            <Route path="/login" exact>
                                {
                                    isAuth ? <Home />
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
