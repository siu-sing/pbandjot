import { Form, Col, Button } from 'react-bootstrap'
import React, { Component } from 'react'
import Credentials from './registerForms/Credentials';
import Details from './registerForms/Details';
import Contact from './registerForms/Contact';
import Axios from 'axios'
const URL = process.env.REACT_APP_URL;

export default class Register extends Component {
    state = {
        step: 1,
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        password: null,
        gender: null,
        user_details: {
            height: null,
            weight: null,
            home_gym: null,
            date_of_birth: null,
        }
    }
    //Increment state to next step
    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    previousStep = () => {
        this.setState({
            step: this.state.step - 1
        })
    }

    saveData = (data) => {
        let tmp = this.state;
        let res = this.addToObject(tmp, data)
        this.setState({ res })
    };

    //helper function
    addToObject(obj, data) {
        for (let key in data) {
            obj[key] = data[key]
        }
        return obj
    }

    registerUser = () => {
        //AXIOS CALL TO REGISTER
        //registerUser(request_body)
        let userDetails = this.state;
        delete userDetails.step;
        delete userDetails.res;
        console.log(`REGISTERING WITH THIS`)
        console.log(userDetails)

        Axios.post(`${URL}/auth/register`, userDetails)
            .then((res)=> {
                console.log(res.data)
                localStorage.setItem("token",res.data.token)
            })
    }

    // display = (<Credentials />
    render() {
        let display = "";
        switch (this.state.step) {
            case 1:
                display = (<Credentials
                    saveData={this.saveData}
                    nextStep={this.nextStep}
                />)
                break;
            case 2:
                display = (<Contact
                    saveData={this.saveData}
                    nextStep={this.nextStep}
                />)
                break;
            case 3:
                display = (<Details
                    saveData={this.saveData}
                    registerUser={this.registerUser}
                />)
                break;
            default:
                break;
        }
        return (
            <>
                <Form>
                    <Form.Row>
                        {display}
                    </Form.Row>
                </Form>
            </>
        )
    }
}

