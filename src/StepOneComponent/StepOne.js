import React, { Component } from 'react';
import Axios from 'axios';

class StepOne extends Component {
    constructor(props){
        super(props);
        console.log(props);
        
        this.state={
            name:sessionStorage.getItem('name'),
            phoneNumber:sessionStorage.getItem('phoneNumber'),
            gender:'',
            status:'active'
        }
    }
    changeHandler=(event)=>{
            let nam = event.target.name;
            let val = event.target.value;
    
            this.setState({
                [nam]: val
            });
    }

    callAPI=(data)=>{
        Axios({
            method: `POST`,
            url: `save-application`,
            data: data
          })
            .then(resp => {
      
              console.log(JSON.stringify(resp.data));
      
              if (resp.data.status === 'success' && resp.data.message ==='registered') {
                  
              }else if(resp.data.status === 'success' && resp.data.message ==='login'){
               
              }else
                alert("done");             
            });
      
    }
    submitHandler = (event) => {
        this.setState({
            status:'complete'
        })
        event.preventDefault();
        let name = this.state.name;
        let phoneNumber = this.state.phoneNumber;
        let gender = this.state.gender;

        let data = {
            name: name,
            phoneNumber: phoneNumber,
            gender: gender,
            isDraft:true
        }
        console.log("calling api..");
        this.callAPI(data);
    }

    handleToUpdate = this.props.stateHandler;

    

    render(){
        return (
            <div>
                <h1>Personal Info</h1>
                <form onSubmit={this.submitHandler}>
                <p className='p'>Name:</p>
                    <input
                        required
                        className="inp"
                        type='text'
                        name='name'
                        value={this.state.name}
                        onChange={this.changeHandler}
                    />
    
                    <p className='p'>Phone Number:</p>
                    <input
                    required
                        className="inp"
                        type='text'
                        name='phoneNumber'
                        value={this.state.phoneNumber}
                        onChange={this.changeHandler}
                    />
                    <p className='p'>Gender:</p>
                    <label>Male
                    <input
                        className="inp"
                        type='radio'
                        name='gender'
                        value='male'
                        onChange={this.changeHandler}
                    /></label>
                    <label>Female
                     <input
                        className="inp"
                        type='radio'
                        name='gender'
                        value='female'
                        onChange={this.changeHandler}
                    /></label>

                    <button type="submit" onClick={()=> this.props.statusHandler()}>Next</button>
                </form>
            </div>
        )
    }
    
}

export default StepOne;
    
