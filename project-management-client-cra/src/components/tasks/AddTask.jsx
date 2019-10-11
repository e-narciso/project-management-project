import React, { Component } from "react";
import axios from "axios";

class AddTask extends Component {
  state = {
    title: "",
    description: "",
    isShowing: false
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const projectId = this.props.theProject._id;
    console.log(title, description, projectId, this.state, this.props);
    axios
      .post("http://localhost:5000/api/tasks", {
        title,
        description,
        projectId
      })
      .then(() => {
        this.props.getTheProject();
        this.setState({
          title: "",
          description: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({
        isShowing: true
      });
    } else {
      this.setState({
        isShowing: false
      });
    }
  };

  showAddTaskForm = () => {
    if (this.state.isShowing) {
      return (
        <div>
          <h3>Add Task</h3>
          <form onSubmit={this.handleFormSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={e => this.handleChange(e)}
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <hr />
        <button onClick={() => this.toggleForm()}>Add Task</button>
        {this.showAddTaskForm()}
      </div>
    );
  }
}

export default AddTask;
