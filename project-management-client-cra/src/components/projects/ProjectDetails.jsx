import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import EditProject from "./EditProject";
import AddTask from "../tasks/AddTask";

class ProjectDetails extends Component {
  state = {};

  componentDidMount() {
    this.getSingleProject();
  }

  getSingleProject = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/projects/${params.id}`, {withCredentials:true})
      .then(responseFromApi => {
        const theProject = responseFromApi.data;
        this.setState(theProject);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      return (
        <EditProject
          theProject={this.state}
          getTheProject={this.getSingleProject}
          {...this.props}
        />
      );
    }
  };

  deleteProject = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/projects/${params.id}`, {withCredentials:true})
      .then(() => {
        this.props.history.push("/projects");
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderAddTaskForm = () => {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      return (
        <AddTask
          theProject={this.state}
          getTheProject={this.getSingleProject}
        />
      );
    }
  };

  ownershipCheck = project => {
    if(this.props.user && project.owner === this.props.user._id){
      console.log(this.props.user, project.owner, this.props.user._id)
      return (
        <div>
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteProject(this.state._id)}>Delete project</button>
        <br />
        <div>{this.renderAddTaskForm()}</div>
      </div>
      )
    }
  }

  render() {
    console.log(this.state.owner, this.props.user)
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        { this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks </h3> }
        { this.state.tasks && this.state.tasks.map((task, index) => {
            return(
                <div key={index}>
                    <Link to={`/projects/${this.state._id}/tasks/${task._id}`}>
                        {task.title}
                    </Link>
                </div>
            )
        })}
        {this.ownershipCheck(this.state)}
        <br/><br/><br/><br/><br/>
        <Link to={"/projects"}>Back to projects</Link>
      </div>
    );
  }
}

export default ProjectDetails;
