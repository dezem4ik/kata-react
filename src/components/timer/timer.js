import React, { Component } from "react";

import "./timer.css";

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsedTime: 0,
      timerInterval: null,
    };

    this.formatTime = (time) => {
      const pad = (num) => (num < 10 ? `0${num}` : num);
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };
  }

  componentWillUnmount() {
    this.clearTimerInterval();
  }

  clearTimerInterval = () => {
    const { timerInterval } = this.state;
    if (timerInterval) {
      clearInterval(timerInterval);
      this.setState({ timerInterval: null });
    }
  };

  startTimer = () => {
    const { onStart } = this.props;
    const { timerInterval } = this.state;

    if (!timerInterval) {
      const newInterval = setInterval(() => {
        this.setState((prevState) => ({
          elapsedTime: prevState.elapsedTime + 1,
        }));
      }, 1000);

      this.setState({ timerInterval: newInterval });
      onStart();
    }
  };

  pauseTimer = () => {
    const { onPause } = this.props;
    this.clearTimerInterval();
    onPause();
  };

  render() {
    const { isRunning } = this.props;
    const { elapsedTime } = this.state;

    return (
      <div className="timer">
        <div className="time">{this.formatTime(elapsedTime)}</div>
        <div>
          {isRunning ? (
            <button
              type="button"
              className="icon icon-pause"
              onClick={this.pauseTimer}
              aria-label="Pause timer"
            />
          ) : (
            <button
              type="button"
              className="icon icon-play"
              onClick={this.startTimer}
              aria-label="Start timer"
            />
          )}
        </div>
      </div>
    );
  }
}
