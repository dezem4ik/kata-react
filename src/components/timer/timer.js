/* eslint-disable */

import React, { Component } from "react";

export default class Timer extends Component {
  render() {
    const { elapsedTime, isRunning, onStart, onPause, formatTime, minutes, seconds } = this.props;

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
  }
}


