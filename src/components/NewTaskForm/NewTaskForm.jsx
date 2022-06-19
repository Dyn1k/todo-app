import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      minutesTimer: 0,
      secondsTimer: 0,
    };
  }

  onInputChange = (e, stateName) => {
    this.setState({
      [stateName]: e.target.value,
    });
  };

  calculateSeconds = (minutes, seconds) => {
    const min = Number(minutes) < 0 ? 0 : Number(minutes);
    const sec = Number(seconds) < 0 ? 0 : Number(seconds);
    return min * 60 + sec;
  };

  onSubmit = (e) => {
    const { text, minutesTimer, secondsTimer } = this.state;
    const { onAdd } = this.props;

    if (e.keyCode === 13) {
      if (text.replace(/\s/g, '').length !== 0) {
        onAdd(text, this.calculateSeconds(minutesTimer, secondsTimer));
        this.setState({
          text: '',
          minutesTimer: 0,
          secondsTimer: 0,
        });
      }
    }
  };

  render() {
    const { text, minutesTimer, secondsTimer } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <form className="new-todo-form" onKeyUp={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(e) => this.onInputChange(e, 'text')}
            value={text}
          />
          <input
            type="number"
            min="0"
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={(e) => this.onInputChange(e, 'minutesTimer')}
            value={minutesTimer === 0 ? '' : minutesTimer}
          />
          <input
            type="number"
            min="0"
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={(e) => this.onInputChange(e, 'secondsTimer')}
            value={secondsTimer === 0 ? '' : secondsTimer}
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
