import React, { Component } from "react";
import axios from "axios";

class EditTask extends Component {
  state = {
    title: this.props.theTask.title,
    description: this.props.theTask.description
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    axios
      .put(`http://localhost:5000/api/tasks/${this.props.theTask._id}`, {
        title,
        description
      })
      .then(() => {
        this.props.getTheTask();
        this.props.history.push(
          `/projects/${this.props.theTask.project}/tasks/${this.props.theTask._id}`
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChangeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleChangeDesc = e => {
    this.setState({
      description: e.target.value
    });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit Form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleChangeTitle(e)}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChangeDesc(e)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditTask;
