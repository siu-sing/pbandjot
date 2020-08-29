import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class Details extends Component {
    state = {
        gender: null,
        user_details: {
            height: null,
            weight: null,
            home_gym: null,
            profile_image_path: null
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    detailsChangeHandler = (e) => {
        let tmp = this.state
        tmp.user_details[e.target.name] = e.target.value
        this.setState(tmp)
    };

    nextClicked = (e) => {
        // console.log(this.state)
        e.preventDefault();
        this.props.saveData(this.state);
        //save to DB
        this.props.registerUser()
        // this.props.nextStep();
    }

    render() {
        return (
            <div>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                        as="select"
                        onChange={this.changeHandler}
                        name="gender"
                    >
                        <option disabled selected>Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        For tracking your Rx workouts.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        onChange={this.detailsChangeHandler}
                        type="number" name="height" placeholder="Height in cm" />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        onChange={this.detailsChangeHandler}
                        type="number" name="weight" placeholder="Weight in kg" />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        onChange={this.detailsChangeHandler}
                        type="text" name="home_gym" placeholder="Gym name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_birth"
                        onChange={this.detailsChangeHandler}
                    />
                </Form.Group>
                <Button onClick={this.nextClicked}>Register</Button>
            </div>
        )
    }
}
