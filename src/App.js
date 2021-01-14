import React, { Component } from 'react';
import './App.css';

import Date from './component/Date.js'
import SingleBarChart from './component/SingleBarChart.js';
import MultipleLineChart from './component/MultipleLineChart';
import SalesOverview from './component/SalesOverview';
import RightPanel from './component/RightPanel';
import RoutePanel from './component/RoutePanel';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      page: 'home'
    }
    this.changeDate = this.changeDate.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  changeDate(start, end) {
    this.setState({ startDate: start, endDate: end });
  }

  changePage(page) {
    this.setState({ page })
  }



  render() {
    // const { startDate, endDate, page } = this.state;
    const startDate = '09 Sep 2020';
    const endDate = '17 Sep 2020';
    const page = this.state.page;

    return (
      <div className="App" >
        <div className='container'>
          <div className='row'>
            <Date homeCallback={this.changeDate} />
          </div>

          <div className="row">
            <div className='col-2 route-col'>
              <RoutePanel homeCallback={this.changePage} />
            </div>
            <div className="col-8">
              {
                (page === 'home' || page === 'overview') &&
                <SalesOverview startDate={startDate} endDate={endDate} />
              }
              {
                (page === 'home' || page === 'linechart') &&
                <MultipleLineChart startDate={startDate} endDate={endDate} />
              }
              {
                (page === 'home' || page === 'barchart') &&
                <SingleBarChart startDate={startDate} endDate={endDate} />
              }

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
