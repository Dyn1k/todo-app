import React from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

function TaskFilter(props) {
  const { onCompletedFilter, onActiveFilter, onAllFilter, filterValue } = props;

  const onToggleFilterButtons = (name) =>
    filterValue === name ? 'selected' : null;

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={onToggleFilterButtons('all')}
          onClick={onAllFilter}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={onToggleFilterButtons('active')}
          onClick={onActiveFilter}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={onToggleFilterButtons('completed')}
          onClick={onCompletedFilter}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TaskFilter.defaultProps = {
  onCompletedFilter: () => {},
  onActiveFilter: () => {},
  onAllFilter: () => {},
  filterValue: 'all',
};

TaskFilter.propTypes = {
  onCompletedFilter: PropTypes.func,
  onActiveFilter: PropTypes.func,
  onAllFilter: PropTypes.func,
  filterValue: PropTypes.string,
};

export default TaskFilter;
