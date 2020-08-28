import React from 'react';
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


function App() {
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
                            <Login />
                        </Route>
                        </Container>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
