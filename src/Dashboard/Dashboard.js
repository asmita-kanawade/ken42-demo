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

        if (!userId) {
            this.props.history.push({ pathname: `/` });
        }
        else
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

    logout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="welcome-card">

                    <div className="welcome-text">
                        <h3>Welcome {this.state.name}</h3>
                    </div>

                    {
                        this.state.applications.length === 0 ?
                            <div className="btn-create">
                                <button
                                    className="btn"
                                    onClick={this.createApplication}
                                >
                                    Create Application
                                </button>
                            </div>
                            : null
                    }

                    {
                        this.state.name ?
                            <div className="btn-create">
                                <button
                                    className="btn"
                                    onClick={this.logout}
                                >
                                    Logout
                                </button>
                            </div>
                            : null
                    }
                </div>

                <hr />

                <div>
                    <h3 className="dashboard-tab">Submitted Applications</h3>
                    <div className="submit-card">
                        {this.state.applications.length == 0 ? <div>
                            <Card>
                                <p>Application Not Submitted yet..!</p>
                            </Card>
                        </div> : <></>}

                        {
                            this.state.applications.map(application => {

                                if (!application.is_draft) {
                                    return <div key={application._id} className="submit-card">
                                        <Card>
                                            <h3>{application.name}</h3>
                                            <p>email: {application.email}</p>
                                            <p>address: {application.address_line1}</p>
                                            <div>
                                                {/* <button>View</button> */}
                                                <div>
                                                    <input className="access-code" type="text" placeholder="Enter Access Code to view application" name="inpAccessCode" value={this.state.inpAccessCode} onChange={this.changeHandler}></input>
                                                    <button type="button" onClick={() => this.openApplication(application._id)}>VIEW</button>
                                                </div>
                                            </div>
                                        </ Card>
                                    </div>
                                }
                                return (
                                    <div className="empty-card" key={application._id}>
                                        <div>
                                            <Card>
                                                <p>Application not submitted yet..!</p>
                                            </Card>
                                        </div>
                                    </div>);
                            })
                        }
                    </div>
                </div>
                <br /><br />

                <div>
                    <h3 className="dashboard-tab">Draft Applications</h3>
                    <div className="submit-card">
                        {this.state.applications.length == 0 ? <div>
                            <Card>
                                <p>Draft is empty</p>
                            </Card>
                        </div> : <></>}
                        {
                            this.state.applications.map(application => {
                                if (application.is_draft) {
                                    return <div key={application._id} className="draft-card" >
                                        <Card>
                                            <h3>{application.name}</h3>
                                            <p>email: {application.email}</p>
                                            <p>address: {application.address_line1}</p>
                                            <button type="button" onClick={() => this.editApplication(application._id)}>EDIT</button>
                                        </Card>
                                    </div>
                                }
                                return (
                                    <div key={application._id} className="submit-card">
                                        <div>
                                            <Card>
                                                <p>Draft is empty</p>
                                            </Card>
                                        </div>
                                    </div>);
                            })
                        }

                    </div>
                </div>
            </div>
        )
    }
}