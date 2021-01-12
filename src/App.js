import React, { Component } from 'react';
import Date from './component/Date.js'
import './App.css';
import BarChart from './component/BarChart.js';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    }
    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(start, end) {
    this.setState({ startDate: start, endDate: end });
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <div className="App" >
        <Date homeCallback={this.changeDate} />
        <BarChart startDate={startDate} endDate={endDate} />
      </div>
    );
  }
}

export default App;
