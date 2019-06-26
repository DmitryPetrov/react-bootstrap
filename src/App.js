import React from 'react';
import './App.css';

const INTERVAL = 100;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      stopped: false
    };
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  increment() {
    if (!this.state.stopped) {
      this.setState({value: this.state.value + 1});
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.increment(), 1000/INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  stopTimer() {
    this.setState({stopped: !this.state.stopped});
    if(this.state.stopped) {
      clearInterval(this.timerID);
    } else {
      this.timerID = setInterval(() => this.increment(), 1000/INTERVAL);
    }
  }

  resetTimer() {
    this.setState({value: 0});
  }

  render () {
    const value = this.state.value;
    return (
      <div class="container-fluid align-items-center">
        <h1 class="display-1">Timer: </h1>
        <h1 class="display-1">
          <span><kbd>{Math.floor(value/INTERVAL/60/60)} : </kbd></span>
          <span><kbd>{Math.floor(value/INTERVAL/60) % 60} : </kbd></span>
          <span><kbd>{Math.floor(value/INTERVAL) % 60} . </kbd></span>
          <span><kbd>{value % INTERVAL < 10 ? '0' : ''}{value % INTERVAL}</kbd></span>
        </h1>
        <div class="">
          <button class="display-4" onClick={this.stopTimer}>{this.state.stopped ? 'Start' : 'Stop'}</button> 
          <button class="display-4" onClick={this.resetTimer}>Refresh</button>
        </div>
      </div>
    );
  }
}

export default App;
