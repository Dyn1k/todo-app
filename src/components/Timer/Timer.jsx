import React from 'react';

import PropTypes from 'prop-types';

import './Timer.css';

const Timer = ({ timer }) => {
  const showTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return <span>{showTime(timer)}</span>;
};

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default Timer;
