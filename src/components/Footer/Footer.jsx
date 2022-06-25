import React from 'react';

import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

import './Footer.css';

const Footer = (props) => {
  const { onToggleFilter, filterValue, clearCompletedTasks, todo } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {todo} item
        {todo > 1 ? 's' : null} left
      </span>
      <TasksFilter onToggleFilter={onToggleFilter} filterValue={filterValue} />
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompletedTasks}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  onToggleFilter: () => {},
  filterValue: 'all',
  clearCompletedTasks: () => {},
  todo: 0,
};

Footer.propTypes = {
  onToggleFilter: PropTypes.func,
  filterValue: PropTypes.string,
  clearCompletedTasks: PropTypes.func,
  todo: PropTypes.number,
};

export default Footer;
