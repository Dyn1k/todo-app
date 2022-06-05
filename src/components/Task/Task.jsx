import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { formatDistanceToNow } from 'date-fns';
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

    this.onEditTask = this.onEditTask.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
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

  onInputChange(e) {
    this.setState({
      modifiedText: e.target.value,
    });
  }

  onEditTask() {
    this.setState({
      isEdit: true,
    });
  }

  createdTime() {
    const { task } = this.props;
    return formatDistanceToNow(task.created, {
      includeSeconds: true,
    });
  }

  finishEdit(e) {
    const { onEdit, task } = this.props;
    const { modifiedText } = this.state;

    if (e.keyCode === 13) {
      onEdit(task.id, modifiedText);
      this.setState({
        isEdit: false,
      });
    }
  }

  render() {
    const { task, onDelete, onToggleDone } = this.props;
    const { updatedTime, isEdit, modifiedText } = this.state;

    let classNames = '';

    if (!task.isVisible) {
      classNames += ' hidden';
    }

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
            <span className="description">{task.description}</span>
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
};

Task.propTypes = {
  task: PropTypes.shape({
    description: PropTypes.string,
    done: PropTypes.bool,
    isVisible: PropTypes.bool,
    created: PropTypes.shape(),
    id: PropTypes.number,
  }),
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Task;
