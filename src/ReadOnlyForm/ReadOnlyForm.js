import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Card from '../UI/Card';
import './ReadOnlyForm.css';

export default class ReadOnlyForm extends Component{
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
        _id : null
    }



    componentDidMount = () => {
        let loc = this.props.location.state === undefined ? {} : this.props.location.state;
        let appID = loc.appID || null;

        if(appID) {
            axios({
                method: `POST`,
                url: `get-application`,
                data: {_id: appID}
            })
            .then(res => {
                let application = res.data[0];
                console.log(application);
                
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

    redirectToDashboard=()=>{
        
        this.props.history.push({
            pathname: '/dashboard'
        });
    }

    render(){
        return(
            <div  className="display-form">
                <button onClick={this.redirectToDashboard}>Back to Dashboard</button>
                <Card>
                <div>Application ID: {this.state._id}</div>
                <div >
                    <h3>Personal Information</h3>
                    <div className="info">
                        <p>Name: {this.state.name}</p>
                        <p>Phone Number: {this.state.phoneNumber}</p>
                        <p>Gender: {this.state.gender}</p>
                    </div>
                </div>
                <div>
                    <h3>Parent Information</h3>
                    <div className="info">
                        <p>Mother's Name: {this.state.mother_name}</p>
                        <p>Father's Name: {this.state.father_name}</p>
                        <p>Email: {this.state.email}</p>
                    </div>
                </div>
                <div>
                    <h3>Communication Address</h3>
                    <div className="info">
                        <p>Address Type: {this.state.communication_address}</p>
                        <p>Address Line 1: {this.state.address_line1}</p>
                        <p>Address Line 2: {this.state.address_line2}</p>
                    </div>
                </div>
                </Card>

            </div>
        )
    }
}