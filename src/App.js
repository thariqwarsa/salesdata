import React, { Component, Fragment } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
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
    }
    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(start, end) {
    this.setState({ startDate: start, endDate: end });
  }

  render() {
    const { startDate, endDate } = this.state;
    // const startDate = '09 Sep 2020';
    // const endDate = '17 Sep 2020';
    // const page = this.state.page;

    return (
      <BrowserRouter>
        <div className="App" >
          <div className='container'>
            <div className='row'>
              <div className='col-2 route-col'>
                <RoutePanel />
              </div>
              <div className='col-10'>
                <div className='row'>
                  <div className='col-6'>
                    <div className='main-title'>Dashboard</div>
                  </div>
                  <div className='col-6'>
                    <Date homeCallback={this.changeDate} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-9'>
                    <Switch>
                      <Route exact path='/' component={() => (
                        <Fragment>
                          <SalesOverview startDate={startDate} endDate={endDate} />
                          <MultipleLineChart startDate={startDate} endDate={endDate} />
                          <SingleBarChart startDate={startDate} endDate={endDate} />
                        </Fragment>
                      )} />
                      <Route exact path='/overview' component={() => <SalesOverview startDate={startDate} endDate={endDate} />} />
                      <Route exact path='/linechart' component={() => <MultipleLineChart startDate={startDate} endDate={endDate} />} />
                      <Route exact path='/barchart' component={() => <SingleBarChart startDate={startDate} endDate={endDate} />} />
                    </Switch>
                  </div>
                  <div className='col-3'>
                    <RightPanel startDate={startDate} endDate={endDate} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
