import React, { Component } from 'react';
import './App.css';

import Date from './component/Date.js'
import SingleBarChart from './component/SingleBarChart.js';
import MultipleLineChart from './component/MultipleLineChart';
import SalesOverview from './component/SalesOverview';
import RightPanel from './component/RightPanel';

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
          <div className='row'>
            <Date homeCallback={this.changeDate} />
          </div>

          <div className="row">
            <div className='col-2'>

            </div>
            <div className="col-8">
              <SalesOverview startDate={startDate} endDate={endDate} />
              <MultipleLineChart startDate={startDate} endDate={endDate} />
              <SingleBarChart startDate={startDate} endDate={endDate} />
            </div>
            <div className='col-2'>
              <RightPanel startDate={startDate} endDate={endDate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
