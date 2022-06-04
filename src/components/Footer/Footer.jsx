import React from 'react';

import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

import './Footer.css';

function Footer(props) {
  const {
    onCompletedFilter,
    onActiveFilter,
    onAllFilter,
    filterValue,
    clearCompletedTasks,
    todo,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {todo} item
        {todo > 1 ? 's' : null} left
      </span>
      <TasksFilter
        onCompletedFilter={onCompletedFilter}
        onActiveFilter={onActiveFilter}
        onAllFilter={onAllFilter}
        filterValue={filterValue}
      />
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompletedTasks}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  onCompletedFilter: () => {},
  onActiveFilter: () => {},
  onAllFilter: () => {},
  filterValue: 'all',
  clearCompletedTasks: () => {},
  todo: 0,
};

Footer.propTypes = {
  onCompletedFilter: PropTypes.func,
  onActiveFilter: PropTypes.func,
  onAllFilter: PropTypes.func,
  filterValue: PropTypes.string,
  clearCompletedTasks: PropTypes.func,
  todo: PropTypes.number,
};

export default Footer;
