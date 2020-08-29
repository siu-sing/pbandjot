import { Form, Button } from 'react-bootstrap'
import React, { Component } from 'react'

export default class Credentials extends Component {
    state = {
        username: null,
        password: null
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    nextClicked = (e) => {
        // console.log(this.state)
        e.preventDefault();
        //check if username is taken with an API call
        this.props.saveData(this.state);
        this.props.nextStep();
    }

    render() {
        return (
            <div>
                <Form.Group>
                    <Form.Label>Select a Username</Form.Label>
                    <Form.Control
                        onChange={this.changeHandler}
                        type="text" name="username" placeholder="Username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={this.changeHandler}
                        type="password" name="password" placeholder="" />
                </Form.Group>
                <Button onClick={this.nextClicked}>Next</Button>
            </div>
        )
    }
}