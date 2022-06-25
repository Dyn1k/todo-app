import React from 'react';

import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

const TaskList = ({
  tasks,
  onDelete,
  onToggleDone,
  onEdit,
  filterValue,
  onStartTimer,
}) => {
  const filteredElements = tasks.filter((task) => {
    switch (filterValue) {
      case 'all': {
        return task;
      }
      case 'active': {
        return task.done === false;
      }
      case 'completed': {
        return task.done === true;
      }
      default: {
        return task;
      }
    }
  });

  const elements = filteredElements.map((task) => (
    <Task
      key={task.id}
      task={task}
      onDelete={() => onDelete(task.id)}
      onToggleDone={() => onToggleDone(task.id)}
      onEdit={onEdit}
      onStartTimer={onStartTimer}
    />
  ));

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleDone: () => {},
  onEdit: () => {},
  onStartTimer: () => {},
  filterValue: 'all',
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
  filterValue: PropTypes.string,
  onStartTimer: PropTypes.func,
};

export default TaskList;
