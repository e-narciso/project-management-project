import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import EditTask from "./EditTask";

class TaskDetails extends Component {
  state = {};

  componentDidMount() {
    this.getTheTask();
  }

  getTheTask = () => {
    const { params } = this.props.match;
    axios
      .get(
        `http://localhost:5000/api/projects/${params.id}/tasks/${params.taskId}`
      )
      .then(responseFromApi => {
        const theTask = responseFromApi.data;
        this.setState(theTask);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.title) {
      this.getTheTask();
    } else {
      return (
        <EditTask
          theTask={this.state}
          getTheTask={this.getTheTask}
          {...this.props}
        />
      );
    }
  };

  deleteTask = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/tasks/${params.taskId}`)
      .then(() => {
        this.props.history.push(`/projects/${params.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <div>{this.renderEditForm()}</div>
        <button onClick={() => this.deleteTask()}>Delete Task</button>
      </div>
    );
  }
}

export default TaskDetails;
