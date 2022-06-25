import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../Timer';

import './Task.css';

const Task = ({ task, onStartTimer, onEdit, onDelete, onToggleDone }) => {
  const createdTime = () =>
    formatDistanceToNow(task.created, {
      includeSeconds: true,
    });

  const [updatedTime, setUpdatedTime] = useState(createdTime());
  const [isEdit, setEdit] = useState(false);
  const [modifiedText, setModifiedText] = useState(task.description);
  const [time, setTime] = useState(task.timer);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatedTime(createdTime());
    }, 30000);
    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => () => clearInterval(timer), []);

  useEffect(() => {
    onStartTimer(task.id, time);
    if (task.timer === 1) {
      clearInterval(timer);
    }
  }, [time]);

  const onInputChange = (e) => {
    setModifiedText(e.target.value);
  };

  const onEditTask = () => {
    setEdit(true);
  };

  const startTimer = () => {
    if (!timer && task.timer !== 0) {
      setTimer(
        setInterval(() => {
          setTime((t) => t - 1);
        }, 1000)
      );
    }
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(0);
  };

  const finishEdit = (e) => {
    if (e.keyCode === 13) {
      if (modifiedText.replace(/\s/g, '').length !== 0) {
        onEdit(task.id, modifiedText);
        setEdit(false);
      }
    }
  };

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
              onClick={startTimer}
            />
            <button
              type="button"
              className="icon icon-pause"
              aria-label="Pause button"
              onClick={stopTimer}
            />
            <Timer timer={time} />
          </span>
          <span className="created">created {updatedTime} ago</span>
        </label>
        <button
          type="button"
          aria-label="Edit button"
          className="icon icon-edit"
          onClick={onEditTask}
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
          onKeyUp={finishEdit}
          onChange={onInputChange}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
        />
      ) : null}
    </li>
  );
};

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
