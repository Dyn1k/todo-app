import React from 'react';

import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

function TaskList({ tasks, onDelete, onToggleDone, onEdit }) {
  const elements = tasks.map((task) => (
    <Task
      key={task.id}
      task={task}
      onDelete={() => onDelete(task.id)}
      onToggleDone={() => onToggleDone(task.id)}
      onEdit={onEdit}
    />
  ));

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleDone: () => {},
  onEdit: () => {},
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
  onEdit: PropTypes.func,
};

export default TaskList;
