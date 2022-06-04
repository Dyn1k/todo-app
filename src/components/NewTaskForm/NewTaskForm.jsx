import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  onSubmit(e) {
    const { text } = this.state;
    const { onAdd } = this.props;

    e.preventDefault();
    onAdd(text);
    this.setState({
      text: '',
    });
  }

  render() {
    const { text } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onInputChange}
            value={text}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  onAdd: () => {},
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};

export default NewTaskForm;
