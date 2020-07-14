import React, { Component } from 'react';

class Notification extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        setTimeout(this.redirectToInfo,3000);
    }

    redirectToInfo=()=>{
        this.props.history.push({
            pathname:`/info`
          });
    }

  render() {
    return (
    <div>Registerd successfully..!</div>
    );
  }
}

export default Notification;