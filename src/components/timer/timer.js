/* eslint-disable */

import React from "react";

const Timer = ({ elapsedTime, isRunning, onStart, onPause, formatTime, minutes, seconds }) => {
  return (
    <div className="timer">
      <div className="time">{formatTime(elapsedTime, minutes, seconds)}</div>
      <div>
        <button
          type="button"
          className="icon icon-pause"
          onClick={onPause}
          aria-label="Pause timer"
        />
        <button
          type="button"
          className="icon icon-play"
          onClick={onStart}
          aria-label="Start timer"
        />
      </div>
    </div>
  );
};

export default Timer;



