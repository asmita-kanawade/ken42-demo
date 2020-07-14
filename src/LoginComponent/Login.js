import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'

import Card from '../UI/Card';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dob: '',
            rollNumber: '',
            name: '',
            phoneNumber: '',
            isAdmin: false,
            notify: false
        };

    }

    callAPI=(data)=>{
        Axios({
            method: `POST`,
            url: `register-login`,
            data: data
          })
        .then(resp => {    
            console.log(`response from login api${JSON.stringify(resp.data)}`);    
            if (resp.data.status === 'success') {
                localStorage.setItem('phoneNumber', resp.data.user.phoneNumber);
                localStorage.setItem('name', resp.data.user.name);
                localStorage.setItem('userId', resp.data.user._id);
                
                this.props.history.push({pathname: `/dashboard`});
            }
            else
                alert("Failed to login!");                               
        });
      
    }

    submitHandler = (event) => {
        event.preventDefault();
        let dob = this.state.dob;
        let name = this.state.name;
        let rollNumber = this.state.rollNumber;
        let phoneNumber = this.state.phoneNumber;
        let isAdmin = this.state.isAdmin;

        let data = {

            dob: dob,
            name: name,
            rollNumber: rollNumber,
            phoneNumber: phoneNumber,
            isAdmin: isAdmin
        }

        console.log("calling api..");
        this.callAPI(data);
      
       
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        this.setState({
            [nam]: val
        });
    }


    checkHandler = (event) => {
        this.setState({
            isAdmin: !this.state.isAdmin
        });
    }

    doLogin = (loginDetails) => {
        alert("login with name" + loginDetails.isAdmin);
        this.props.history.push({
            pathname:`/info`
          });

    }

    render() {
        return (
          
            <div className="container-login">
                <form onSubmit={this.submitHandler} autocomplete="off" className="form-container">
        {this.state.notify ?<>{
                alert("Registerd successfully..!")
            }{this.setState({
                notify:!this.state.notify
            })}</>:<></>}
                    {!this.state.isAdmin ?
                        <>
                            {/* <p className='p'>Date Of Birth:</p> */}
                            <input
                            placeholder="Date Of Birth"
                                required
                                className="inp"
                                type='date'
                                name='dob'
                                value={this.state.dob}
                                onChange={this.changeHandler}
                            />

                            {/* <p className='p'>Roll Number:</p> */}
                            <input
                            placeholder="Roll Number"
                                required
                                className="inp"
                                type='text'
                                name='rollNumber'
                                value={this.state.rollNumber}
                                onChange={this.changeHandler}
                            />
                            {/* <p className='p'>Name:</p> */}
                            <input
                            placeholder="Name"
                                required
                                className="inp"
                                type='text'
                                name='name'
                                value={this.state.name}
                                onChange={this.changeHandler}
                            />

                            {/* <p className='p'>Phone Number:</p> */}
                            <input
                            placeholder="Phone Number"
                                required
                                className="inp"
                                type="text"
                                InputProps={{ inputProps: { min: 0 } }}
                                name='phoneNumber'
                                value={this.state.phoneNumber}
                                onChange={this.changeHandler}
                            />


                        </> :
                        <>
                            {/* <p className='p'>Name:</p> */}
                            <input
                            placeholder="Name"
                                required
                                className="inp"
                                type='text'
                                name='name'
                                value={this.state.name}
                                onChange={this.changeHandler}
                            />

                            {/* <p className='p'>Phone Number:</p> */}
                            <input
                            placeholder="Phone Number"
                                required
                                className="inp"
                                type="text"
                                InputProps={{ inputProps: { min: 0 } }}
                                name='phoneNumber'
                                value={this.state.phoneNumber}
                                onChange={this.changeHandler}
                            />

                        </>}

                    <div className="checkbox-container">
                        <input
                            type='checkbox'
                            name='is_admin'
                            onChange={this.checkHandler}
                            defaultChecked={this.state.isAdmin}
                        />
                        <label className='p'>Is Admin</label>
                    </div>
                    <input
                        className="inp"
                        type='submit' />
                </form>
            </div>
          
        );
    }
}