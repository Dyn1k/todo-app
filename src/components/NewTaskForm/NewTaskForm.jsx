import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';

import './NewTaskForm.css';

const NewTaskForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const inputText = useRef(null);

  const calculateSeconds = (min, sec) => {
    const m = Number(min) < 0 ? 0 : Number(min);
    const s = Number(sec) < 0 ? 0 : Number(sec);
    return m * 60 + s;
  };

  const onSubmit = (e) => {
    if (e.keyCode === 13) {
      if (text.replace(/\s/g, '').length !== 0) {
        onAdd(text, calculateSeconds(minutes, seconds));
        setText('');
        setMinutes(0);
        setSeconds(0);
        inputText.current.focus();
      }
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <form className="new-todo-form" onKeyUp={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => setText(e.target.value)}
          value={text}
          ref={inputText}
        />
        <input
          type="number"
          min="0"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(e) => setMinutes(e.target.value)}
          value={minutes === 0 ? '' : minutes}
        />
        <input
          type="number"
          min="0"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(e) => setSeconds(e.target.value)}
          value={seconds === 0 ? '' : seconds}
        />
      </form>
    </header>
  );
};

NewTaskForm.defaultProps = {
  onAdd: () => {},
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};

export default NewTaskForm;
