import React, { Component } from 'react';
/* eslint-disable */
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../Timer';

import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);

    const { task } = this.props;

    this.state = {
      updatedTime: this.createdTime(),
      isEdit: false,
      modifiedText: task.description,
    };

    this.timer = 0;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        updatedTime: this.createdTime(),
      });
    }, 30000);
  }

  componentDidUpdate() {
    const { task } = this.props;

    if (task.timer === 0) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.timer);
  }

  onInputChange = (e) => {
    this.setState({
      modifiedText: e.target.value,
    });
  };

  onEditTask = () => {
    this.setState({
      isEdit: true,
    });
  };

  startTimer = () => {
    const { onStartTimer, task } = this.props;

    if (!this.timer && task.timer !== 0) {
      this.timer = setInterval(onStartTimer, 1000);
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.timer = 0;
  };

  finishEdit = (e) => {
    const { onEdit, task } = this.props;
    const { modifiedText } = this.state;

    if (e.keyCode === 13) {
      if (modifiedText.replace(/\s/g, '').length !== 0) {
        onEdit(task.id, modifiedText);
        this.setState({
          isEdit: false,
        });
      }
    }
  };

  createdTime() {
    const { task } = this.props;
    return formatDistanceToNow(task.created, {
      includeSeconds: true,
    });
  }

  render() {
    const { task, onDelete, onToggleDone } = this.props;
    const { updatedTime, isEdit, modifiedText } = this.state;

    let classNames = '';

    if (task.done) {
      classNames += ' completed';
    }

    if (isEdit) {
      classNames += ' editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <span className="title">{task.description}</span>
            <span className="description">
              <button
                type="button"
                className="icon icon-play"
                aria-label="Play button"
                onClick={this.startTimer}
              />
              <button
                type="button"
                className="icon icon-pause"
                aria-label="Pause button"
                onClick={this.stopTimer}
              />
              <Timer timer={task.timer} />
            </span>
            <span className="created">created {updatedTime} ago</span>
          </label>
          <button
            type="button"
            aria-label="Edit button"
            className="icon icon-edit"
            onClick={this.onEditTask}
          />
          <button
            type="button"
            aria-label="Delete button"
            className="icon icon-destroy"
            onClick={onDelete}
          />
        </div>
        {isEdit ? (
          <input
            type="text"
            className="edit"
            value={modifiedText}
            onKeyUp={this.finishEdit}
            onChange={this.onInputChange}
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus
          />
        ) : null}
      </li>
    );
  }
}

Task.defaultProps = {
  task: [],
  onDelete: () => {},
  onToggleDone: () => {},
  onEdit: () => {},
  onStartTimer: () => {},
};

Task.propTypes = {
  task: PropTypes.shape({
    description: PropTypes.string,
    timer: PropTypes.number,
    done: PropTypes.bool,
    isVisible: PropTypes.bool,
    created: PropTypes.shape(),
    id: PropTypes.number,
  }),
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
  onStartTimer: PropTypes.func,
};

export default Task;
