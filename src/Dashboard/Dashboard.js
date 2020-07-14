import React, { Component } from 'react';
import axios from 'axios';

import Card from '../UI/Card';
import '../Dashboard/Dashboard.css'

export default class Dashboard extends Component {

    state = {
        applications: [],
        name: localStorage.getItem('name'),
        inpAccessCode: "",
        appID: ""
    }

    componentDidMount() {
        let userId = localStorage.getItem('userId');

        axios({
            method: `POST`,
            url: `get-applications`,
            data: { userID: userId }
        })
            .then(res => {
                this.setState({
                    applications: [...res.data]
                });

                //console.log(`[Dashboard.js] application: ${JSON.stringify(res.data)}`);
            });

    }

    createApplication = () => {
        this.props.history.push('/info');
    }

    editApplication = (appID) => {
        this.props.history.push({
            pathname: '/info',
            state: { appID }
        });
    }

    openApplication = (appID) => {
        let inpAccessCode = this.state.inpAccessCode;
        axios({
            method: `POST`,
            url: `check-access-code`,
            data: { _id: appID, access_code: inpAccessCode }
        })
            .then(res => {
                console.log(res.data);
                if (res.data.status === 'success') {
                    // alert(res.data.message);

                    this.props.history.push({
                        pathname: '/display-info',
                        state: { appID }
                    });
                }
                else if (res.data.status === 'failed')
                    alert(res.data.message);

            });


    }
    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        this.setState({
            [nam]: val
        });

    }

    render() {
        return (
            <div>
                <div className="welcome-card">
                    <Card>
                        <div className="welcome-text">
                            <h4>Welcome {this.state.name}</h4>
                        </div>

                        {
                            this.state.applications.length === 0 ?
                                <button
                                    className="btn"
                                    onClick={this.createApplication}
                                >
                                    Create
                    </button>
                                : null
                        }
                    </Card>
                </div>
                <br /><br /><hr />

                <div>
                    <h3 className="dashboard-tab">Submitted Applications</h3>
                    <div className="submit-card">
                        {this.state.applications.length == 0 ? <div>
                            <Card>
                                <p>No Application Available..!</p>
                            </Card>
                        </div> : <></>}

                        {
                            this.state.applications.map(application => {

                                if (!application.is_draft) {
                                    return <Card>
                                        <div key={application._id}>
                                            <h3>name: {application.name}</h3>
                                            <p>email: {application.email}</p>
                                            <p>address: {application.address_line1}</p>
                                            <div>
                                                {/* <button>View</button> */}
                                                <div className="access-code">
                                                    <input type="text" placeholder="Enter Access Code to view application" name="inpAccessCode" value={this.state.inpAccessCode} onChange={this.changeHandler}></input>
                                                    <button type="button" onClick={() => this.openApplication(application._id)}>VIEW</button>
                                                </div>
                                            </div>
                                        </ div>
                                    </Card>
                                }
                                return null;
                            })
                        }
                    </div>
                </div>
            <br /><br /><hr />
        
            <div>
            <h3 className="dashboard-tab">Draft Applications</h3>
                <div className="submit-card">
                    {this.state.applications.length == 0 ? <div>
                        <Card>
                            <p>No Draft Available..!</p>
                        </Card>
                    </div> : <></>}
                    {
                        this.state.applications.map(application => {
                            if (application.is_draft) {
                                return <div key={application._id} onClick={() => this.editApplication(application._id)}>
                                    <h3>name: {application.name}</h3>
                                    <p>email: {application.email}</p>
                                    <p>address: {application.address_line1}</p>
                                </div>
                            }
                            return null;
                        })
                    }

                </div>
            </div>
        </div>
        )
    }
}