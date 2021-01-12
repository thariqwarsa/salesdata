import React, { Component } from 'react';
import Date from './component/Date.js'
import './App.css';

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
    console.log(this.state.startDate, this.state.endDate);
    return (
      <div className="App" >
        <Date homeCallback={this.changeDate} />
      </div>
    );
  }
}

export default App;
