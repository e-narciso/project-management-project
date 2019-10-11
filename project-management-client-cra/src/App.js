import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import { Switch, Route } from "react-router-dom";
// import AddProject from "../../project-management-client-cra/src/components/projects/AddProject";
import Navbar from "./components/navbar/Navbar";
import ProjectList from "./components/projects/ProjectList";
import ProjectDetails from "./components/projects/ProjectDetails";
import TaskDetails from "./components/tasks/TaskDetails";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import ProtectedRoute from "./components/auth/ProtectedRoute";

class App extends Component {
  state = {
    loggedInUser: null
  };

  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };
  render() {
    this.fetchUser();
    console.log(this.state.loggedInUser);
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser}
          />
          <Switch>
            <Route exact path="/projects" component={ProjectList} />
            <Route
              exact
              path="/projects/:id"
              render={props => (
                <ProjectDetails
                  {...props}
                  loggedInUser={this.state.loggedInUser}
                />
              )}
            />
            <Route
              exact
              path="/projects/:id/tasks/:taskId"
              render={props => (
                <TaskDetails
                  {...props}
                  loggedInUser={this.state.loggedInUser}
                />
              )}
            />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/"
              render={() => <Login getUser={this.getTheUser} />}
            />
            <Route exact path="/projects" component={ProjectList} />
            <Route exact path="/projects/:id" component={ProjectDetails} />
            <Route
              exact
              path="/projects/:id/tasks/:taskId"
              component={TaskDetails}
            />
          </Switch>
        </div>
      );
    }
    // return (
    //   <div className="App">
    //     <Navbar userInSession={this.state.loggedInUser}/>
    //     <Switch>
    //       <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser}/>} />
    //       <Route exact path="/projects" component={ProjectList} />
    //       <Route exact path="/projects/:id" component={ProjectDetails} />
    //       <Route
    //         exact
    //         path="/projects/:id/tasks/:taskId"
    //         component={TaskDetails}
    //       />
    //     </Switch>
    //   </div>
    // );
  }
}

export default App;
