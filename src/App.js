import React from 'react';
import Login from './LoginComponent/Login';
import './App.css';
import Info from './InfoComponent/Info';
import InfoNew from './InfoComponent/InfoNew';
import Notification from './NotificationComponent/Notification';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import ReadOnlyForm from './ReadOnlyForm/ReadOnlyForm';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path="/display-info" exact component={ReadOnlyForm}></Route>
              <Route path="/info" exact component={InfoNew}></Route>
              <Route path="/dashboard" exact component={Dashboard}></Route>
              <Route path="/notification" exact component={Notification}></Route>
            </Switch>
        </BrowserRouter>
        {/* <Login></Login> */}
    </div>
  );
}

export default App;
