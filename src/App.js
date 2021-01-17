// ============ APP COMPONENT ============  //
// App.js is parent of all components in this project.
// this component handle routing and also pass startdate and endDate 
// from Date component to other components as props.

// import React
import React, { Component, Fragment } from 'react';
// import routing component
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import style. it includes styles for all child component
import './styles/App.css';
// import all components
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

  // pass startDate and endDate to states
  changeDate(start, end) {
    this.setState({ startDate: start, endDate: end });
  }

  render() {
    // grab startDate and endDate state
    const { startDate, endDate } = this.state;

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
                    {/* take startDate and endDate from Date component */}
                    <Date homeCallback={this.changeDate} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-9'>
                    {/* Routing and passed startDate and endDate states to each components as props */}
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
