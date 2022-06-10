import React from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

function TaskFilter(props) {
  const { filterValue, onToggleFilter } = props;

  const onToggleFilterButtons = (name) =>
    filterValue === name ? 'selected' : null;

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          id="all"
          className={onToggleFilterButtons('all')}
          onClick={onToggleFilter}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          id="active"
          className={onToggleFilterButtons('active')}
          onClick={onToggleFilter}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          id="completed"
          className={onToggleFilterButtons('completed')}
          onClick={onToggleFilter}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TaskFilter.defaultProps = {
  filterValue: 'all',
};

TaskFilter.propTypes = {
  onToggleFilter: PropTypes.func.isRequired,
  filterValue: PropTypes.string,
};

export default TaskFilter;
