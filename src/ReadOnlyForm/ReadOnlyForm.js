import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

    redirectToDashboard=()=>{
        
        this.props.history.push({
            pathname: '/dashboard'
        });
    }

    render(){
        return(
            <div>
                <button onClick={this.redirectToDashboard}>Dashboard</button>
                <div>
                    <h2>Personal Information</h2>
                    <div>
                        <label>Name
                            <p>{this.state.name}</p>
                        </label>
                        <label>Phone Number
                            <p>{this.state.phoneNumber}</p>
                        </label>
                        <label>Gender
                            <p>{this.state.Gender}</p>
                        </label>
                    </div>
                </div>
                <div>
                    <h2>Parent Information</h2>
                    <div>
                        <label>Mother's Name
                            <p>{this.state.mother_name}</p>
                        </label>
                        <label>Father's Name
                            <p>{this.state.father_name}</p>
                        </label>
                        <label>Gender
                            <p>{this.state.gender}</p>
                        </label>
                    </div>
                </div>
                <div>
                    <h2>Communication Address Information</h2>
                    <div>
                        <label>Communication Address
                            <p>{this.state.communication_address}</p>
                        </label>
                        <label>Address Line 1
                            <p>{this.state.address_line1}</p>
                        </label>
                        <label>Address Line 2
                            <p>{this.state.address_line2}</p>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}