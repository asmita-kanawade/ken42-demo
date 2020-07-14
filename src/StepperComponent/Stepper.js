import React, { Component } from 'react';

class Stepper extends Component {
    constructor(props){
        super(props);
        this.state={
            incompleted:props.incomplete,
            activeStep:props.active,
            completed:props.completed,
        }
    }
  render() {
    return (
      <div>
          <div>
              <span>1</span>------
              <span>2</span>------
              <span>3</span>
          </div>
      </div>
    );
  }
}

export default Stepper;