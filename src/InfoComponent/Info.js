import React, { Component } from 'react';
import Stepper from '../StepperComponent/Stepper';
import StepOne from '../StepOneComponent/StepOne';
import StepTwo from '../StepTwoComponent/StepTwo';
import StepThree from '../StepThreeComponent/StepThree';

class Info extends Component {

  constructor(props){
    super(props);
   
    this.state = {
      statusOfFirst:'incomplete',
      statusOfSecond:'incomplete',
      statusOfThird:'incomplete'
    }
  }

  statusHandlerFirst=()=>{
    console.log("hit first");
    
      this.setState({
        statusOfFirst:'complete'
      })
  }
  statusHandlerSecond=(value)=>{
    this.setState({
      statusOfSecond:value
    })
}
statusHandlerThird=(value)=>{
  this.setState({
    statusOfThird:value
  })
}

  render() {
    return (
      <div>
        <div>
          <Stepper
           status=''
          ></Stepper>
          {this.state.statusOfFirst === 'complete'?<><h1>Step one passed</h1></>:<></>}
          {this.state.active === 'active'?<></>:<></>}
          {this.state.active === 'active'?<></>:<></>}
          <StepOne statusHandler={this.statusHandlerFirst}></StepOne>
          <StepTwo statusHandler={this.statusHandlerSecond}></StepTwo>
          <StepThree statusHandler={this.statusHandlerThird}></StepThree>
        </div>
      </div>
    );
  }
}

export default Info;