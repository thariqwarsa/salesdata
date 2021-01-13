import React, { Component } from 'react';
import Date from './component/Date.js'
import './App.css';
import SingleBarChart from './component/SingleBarChart.js';
import MultipleLineChart from './component/MultipleLineChart';
import SalesOverview from './component/SalesOverview'

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
    // const { startDate, endDate } = this.state;
    const startDate = '09 Sep 2020';
    const endDate = '17 Sep 2020';

    return (
      <div className="App" >
        <div className='container'>
          <Date homeCallback={this.changeDate} />
          <SalesOverview />
          <MultipleLineChart startDate={startDate} endDate={endDate} />
          <SingleBarChart startDate={startDate} endDate={endDate} />
        </div>
      </div>
    );
  }
}

export default App;
