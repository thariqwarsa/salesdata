import React, { Component } from 'react';
import rangeDate from '../data/year-end.json';

export class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '01 Oct 2019',
      to: ''
    }
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
  }

  handleChangeFrom(evt) {
    this.setState({ from: evt.target.value });
  }

  handleChangeTo(evt) {
    this.setState({ to: evt.target.value });
  }

  render() {
    const renderDate = rangeDate.data.range_date.map(
      date => { return (<option key={date} value={date}>{date}</option>) }
    );

    return (
      < div className='Date' >
        <div className="form-group">
          <label htmlFor="from">From</label>
          <select className="form-control" name='from' id="from"
            value={this.state.from} onChange={this.handleChangeFrom}
          >
            {renderDate}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="to">To</label>
          <select className="form-control" name='to' id="to"
            value={this.state.to} onChange={this.handleChangeTo}
          >
            {renderDate}
          </select>
        </div>
      </div >
    )
  }
}

export default Date
