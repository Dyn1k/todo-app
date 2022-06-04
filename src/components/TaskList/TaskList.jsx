import React from 'react';

import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

function TaskList({ tasks, onDelete, onToggleDone }) {
  const elements = tasks.map((task) => {
    const { id, ...taskProps } = task;

    return (
      <Task
        key={id}
        task={taskProps}
        onDelete={() => onDelete(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      done: PropTypes.bool,
      isVisible: PropTypes.bool,
      created: PropTypes.shape(),
      id: PropTypes.number,
    })
  ),
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
