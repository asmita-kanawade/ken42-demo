import React, { Component } from 'react';
import axios from 'axios';
import './InfoNew.css';
import Card from '../UI/Card';

export default class InfoNew extends Component {
    state = {
        userID: localStorage.getItem('userId'),
        name: localStorage.getItem('name'),
        phoneNumber: localStorage.getItem('phoneNumber'),
        gender: "",
        mother_name: "",
        father_name: "",
        email: "",
        communication_address: "",
        address_line1: "",
        address_line2: "",
        is_default_address: false,
        is_draft: true,
        current_step: "1",
        _id: null
    }

    checkHandler = (event) => {
        this.setState({
            is_default_address: !this.state.is_default_address
        });
    }


    componentDidMount = () => {
        let loc = this.props.location.state === undefined ? {} : this.props.location.state;
        let appID = loc.appID || null;

        if (appID) {
            axios({
                method: `POST`,
                url: `get-application`,
                data: { _id: appID }
            })
                .then(res => {
                    let application = res.data[0];
                    console.log(application.gender);

                    this.setState({
                        _id: application._id,
                        gender: application.gender,
                        mother_name: application.mother_name,
                        father_name: application.father_name,
                        email: application.email,
                        communication_address: application.communication_address,
                        address_line1: application.address_line1,
                        address_line2: application.address_line2,
                        is_default_address: application.is_default_address,
                        is_draft: application.is_draft,
                        current_step: application.current_step
                    });
                });

        }
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        //console.log(`nam: ${nam} val: ${val} `);

        this.setState({
            [nam]: val
        });
    }

    nextStep(step) {
        if (this.state.current_step !== step) {
            this.setState({
                current_step: step
            })
        }

    }

    saveDraftHandler = async () => {
        this.setState({
            current_step: "3"
        });
        await this.setState({ is_draft: true });
        this.saveInfoHandler();
    }


    submitApplicationHandler = async () => {
        await this.setState({ is_draft: false });
        this.saveInfoHandler();
    }

    saveInfoHandler = () => {
        const data = {
            _id: this.state._id,
            userID: this.state.userID,
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            mother_name: this.state.mother_name,
            father_name: this.state.father_name,
            email: this.state.email,
            communication_address: this.state.communication_address,
            address_line1: this.state.address_line1,
            address_line2: this.state.address_line2,
            is_default_address: this.state.is_default_address,
            is_draft: this.state.is_draft,
            current_step: this.state.current_step
        };

        axios({
            url: `save-application`,
            method: `POST`,
            data
        }).then(response => {

            if (response.data.status === 'success') {
                if (!response.data.application.is_draft)
                    alert('Your access code is : ' + response.data.application.access_code);

                this.props.history.push('/dashboard');
            }
            if (response.data.status === 'failed') {
                alert('Something went wrong!');
            }
        });
    }

    componentDidUpdate(){
        if(this.state.name != "" || this.state.phoneNumber !=""){
            document.getElementById('step1').className="active";
        }else document.getElementById('step1').className="";

        if(this.state.mother_name != "" ){
            document.getElementById('step2').className="active";
        }else document.getElementById('step2').className="";

        if(this.state.address_line1 != "" ){
            document.getElementById('step3').className="active";
        }else document.getElementById('step3').className="";
        
    }

    render() {
        return (
            <div className="form-n-stepper">
                <Card>
                    <div>
                        <div className="row">
                            <div className="col-xs-12 col-md-8 offset-md-2 block border">
                                <div className="wrapper-progressBar">
                                    <ul className="progressBar">
                                        <li id="step1" onClick={() => this.nextStep("1")} >Personal Information</li>
                                        <li id="step2" onClick={() => this.nextStep("2")}>Parent Information</li>
                                        <li id="step3" onClick={() => this.nextStep("3")}>Communication Address</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <ul className="stepper-content" id="stepper-content">
                            {this.state.current_step === "1" ? <>
                                <li className="step active">
                                    <div className="step-heading">Step 1</div>
                                    <div className="">
                                        <div className="">
                                            <div className="">
                                                {/* <p className=''>Name*</p> */}
                                                <input
                                                    placeholder="Name"
                                                    required
                                                    className="input-box"
                                                    type='text'
                                                    name='name'
                                                    value={this.state.name}
                                                    onChange={this.changeHandler}
                                                    disabled={true}
                                                />

                                                {/* <p className='p'>Phone Number*</p> */}
                                                <input
                                                    placeholder="Phone Number"
                                                    required
                                                    className="input-box"
                                                    type='text'
                                                    name='phoneNumber'
                                                    value={this.state.phoneNumber}
                                                    onChange={this.changeHandler}
                                                    disabled={true}
                                                />
                                                <div className="checkbox-container">
                                                    Gender:
                                                    
                                                        <input
                                                            className="input-box"
                                                            type='radio'
                                                            name='gender'
                                                            value='male'
                                                            checked={this.state.gender === 'male'}
                                                            onChange={this.changeHandler}
                                                        />
                                                    <label>Male
                                                    </label>
                                                    
                                                        <input
                                                            className="input-box"
                                                            type='radio'
                                                            name='gender'
                                                            value='female'
                                                            checked={this.state.gender === 'female'}
                                                            onChange={this.changeHandler}
                                                        />
                                                        <label>Female</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="step-actions">
                                            <button type="submit" onClick={() => this.nextStep("2")} className="waves-effect waves-dark btn btn-sm btn-primary next-step" data-feedback="someFunction21">CONTINUE</button>
                                        </div>
                                    </div>

                                </li>
                            </> : <></>}
                            {this.state.current_step == "2" ? <>
                                <li className="step">
                                <div className="step-heading">Step 2</div>
                                    <div className="step-new-content">
                                        <div className="row">
                                            <div className="md-form col-12 ml-auto">
                                                {/* <p className='p'>Mother Name*</p> */}
                                                <input
                                                placeholder="Mother's Name"
                                                    required
                                                    className="input-box"
                                                    type='text'
                                                    name='mother_name'
                                                    value={this.state.mother_name}
                                                    onChange={this.changeHandler}
                                                />

                                                {/* <p className='p'>father Name:</p> */}
                                                <input
                                                placeholder="Fathers's Name"
                                                    className="input-box"
                                                    type='text'
                                                    name='father_name'
                                                    value={this.state.father_name}
                                                    onChange={this.changeHandler}
                                                />
                                                {/* <p className='p'>Email:</p> */}
                                                <input
                                                 placeholder="email"
                                                    className="input-box"
                                                    type='email'
                                                    name='email'
                                                    value={this.state.email}
                                                    onChange={this.changeHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="step-actions">
                                            <button onClick={() => this.nextStep("1")} className="waves-effect waves-dark btn btn-sm btn-secondary previous-step">BACK</button>
                                            <button type="submit" onClick={() => this.nextStep("3")} className="waves-effect waves-dark btn btn-sm btn-primary next-step" data-feedback="someFunction21">CONTINUE</button>
                                        </div>
                                    </div>

                                </li>
                            </> : <></>}
                            {this.state.current_step == "3" ? <>
                                <li className="step">
                                <div className="step-heading">Step 3</div>
                                    <div className="step-new-content">
                                        <div className="row">
                                            <div className="md-form col-12 ml-auto">
                                                <select
                                                    id="addresses"
                                                    name="communication_address"
                                                    value={this.state.communication_address}
                                                    onChange={this.changeHandler} >
                                                    <option value="PermanantAddress">Permanant Address</option>
                                                    <option value="BusinessAddress">Business Address</option>
                                                    <option value="Communication Address">Communication Address</option>
                                                </select>
                                                {/* <p className='p'>Address Line 1*</p> */}
                                                <input
                                                placeholder="Address Line 1"
                                                    className="input-box"
                                                    type='text'
                                                    name='address_line1'
                                                    value={this.state.address_line1}
                                                    onChange={this.changeHandler}
                                                />
                                                {/* <p className='p'>Address Line 2:</p> */}
                                                <input
                                                placeholder="Address Line 2"
                                                    className="input-box"
                                                    type='text'
                                                    name='address_line2'
                                                    value={this.state.address_line2}
                                                    onChange={this.changeHandler}
                                                />
                                                 <div className="checkbox-container">
                                                    <input
                                                        type='checkbox'
                                                        name='is_default_address'
                                                        onChange={this.checkHandler}
                                                        defaultChecked={this.state.is_default_address}
                                                    />
                                                    <label className='p'>Is this default address?</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="step-actions">
                                            <button onClick={() => this.nextStep("2")} className="waves-effect waves-dark btn btn-sm btn-secondary previous-step">BACK</button>
                                            <button onClick={this.saveDraftHandler}>SAVE DRAFT</button>
                                            <button onClick={this.submitApplicationHandler}>SUBMIT</button>

                                        </div>
                                    </div>
                                </li>
                            </> : <></>}

                        </ul>
                    </div >
                </Card>
            </div>
        )

    }

}