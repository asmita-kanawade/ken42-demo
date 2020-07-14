import React, { Component } from 'react';

class StepTwo extends Component {
    constructor(props){
        super(props);
        this.state={
            mother_name:'',
            father_name:'',
            email:'',
        }
    }
    changeHandler=(event)=>{
        let nam = event.target.name;
        let val = event.target.value;

        this.setState({
            [nam]: val
        });
}
    render(){
        return (
            <div>
                 <h1>Parent Info</h1>
                <form>
                <p className='p'>Mother Name:</p>
                    <input
                        required
                        className="inp"
                        type='text'
                        name='mother_name'
                        value={this.state.mother_name}
                        onChange={this.changeHandler}
                    />
    
                    <p className='p'>father Name:</p>
                    <input
                        className="inp"
                        type='text'
                        name='father_name'
                        value={this.state.father_name}
                        onChange={this.changeHandler}
                    />
                    <p className='p'>Email:</p>
                    <input
                        className="inp"
                        type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.changeHandler}
                    />
                     <button type="submit">Next</button>
                </form>
            </div>
        )
    }
    
}

export default StepTwo;
    
