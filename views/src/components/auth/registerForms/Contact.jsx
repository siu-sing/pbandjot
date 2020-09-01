import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';

export default class Contact extends Component {
    state = {
        firstname: null,
        lastname: null,
        email: null
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    nextClicked = (e) => {
        e.preventDefault();
        this.props.saveData(this.state);
        this.props.nextStep();
    }

    render() {
        return (
            <div>
                   <Form.Group>
                    <Form.Label>Your contact details</Form.Label>
                    <Form.Control
                        onChange={this.changeHandler}
                        type="text" name="firstname" placeholder="First Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        onChange={this.changeHandler}
                        type="text" name="lastname" placeholder="Last Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        onChange={this.changeHandler}
                        type="email" name="email" placeholder="Email" />
                </Form.Group>
                <Button onClick={this.nextClicked}>Next</Button>
            </div>
        )
    }
}

