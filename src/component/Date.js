import React, { Component } from 'react';
import rangeDate from '../data/year-end.json';

export class Date extends Component {


  render() {
    const renderDate = rangeDate.data.range_date.map(
      date => { return (<option>{date}</option>) }
    );

    return (
      <div className='Date'>
        <div class="form-group">
          <label htmlFor="from">From</label>
          <select className="form-control" name='from-date' id="from">
            {renderDate}
          </select>
        </div>

        <div class="form-group">
          <label htmlFor="to">To</label>
          <select className="form-control" name='to-date' id="to">
            {renderDate}
          </select>
        </div>
      </div>
    )
  }
}

export default Date
