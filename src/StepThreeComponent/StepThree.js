import React, { Component } from 'react';

class StepThree extends Component {
    constructor(props){
        super(props);
        this.state={
            selectValue:'',
            phone_number:'',
            gender:'',
        }
    }
    changeHandler=()=>{}
    handleChange=(e)=>{
            this.setState({selectValue:e.target.value});
          }
    
    render(){
        return (
            <div>
                 <h1>Communication Address</h1>
                <form>
                <select 
                    id="addresses" 
                    name="addresses"
                    value={this.state.selectValue} 
                    onChange={this.handleChange} >
                    <option value="PermanantAddress">Permanant Address</option>
                    <option value="BusinessAddress">Business Address</option>
                    <option value="Communication Address">Communication Address</option>
                </select>
                    <p className='p'>Address Line 1:</p>
                    <input
                        className="inp"
                        type='text'
                        name='add1'
                        value={this.state.add1}
                        onChange={this.changeHandler}
                    />
                   <p className='p'>Address Line 2:</p>
                    <input
                        className="inp"
                        type='text'
                        name='add2'
                        value={this.state.add2}
                        onChange={this.changeHandler}
                    />
                     <button type="submit">Next</button>
                </form>
            </div>
        )
    }
    
}

export default StepThree;
    
