import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { formatDistanceToNow } from 'date-fns';
import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedTime: this.createdTime(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        updatedTime: this.createdTime(),
      });
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  createdTime() {
    const { task } = this.props;
    return formatDistanceToNow(task.created, {
      includeSeconds: true,
    });
  }

  render() {
    const { task, onDelete, onToggleDone } = this.props;
    const { updatedTime } = this.state;

    let classNames = '';

    if (!task.isVisible) {
      classNames += ' hidden';
    }

    if (task.done) {
      classNames += ' completed';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <span className="description">{task.description}</span>
            <span className="created">created {updatedTime} ago</span>
          </label>
          <button
            type="button"
            aria-label="Edit button"
            className="icon icon-edit"
          />
          <button
            type="button"
            aria-label="Delete button"
            className="icon icon-destroy"
            onClick={onDelete}
          />
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  task: [],
  onDelete: () => {},
  onToggleDone: () => {},
};

Task.propTypes = {
  task: PropTypes.shape({
    description: PropTypes.string,
    done: PropTypes.bool,
    isVisible: PropTypes.bool,
    created: PropTypes.shape(),
  }),
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default Task;
