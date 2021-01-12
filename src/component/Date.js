import React, { Component } from 'react';
// import rangeDate from '../data/year-end.json';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.startDate !== this.state.startDate) {
      if (this.state.startDate) {
        console.log(this.state.startDate.toDate())
      }
    }

    if (prevProps.endDate !== this.state.endDate) {
      if (this.state.endDate) {
        console.log(this.state.endDate.toDate())
      }
    }
  }

  render() {
    return (
      <div className='Date'>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
      </div >
    )
  }
}

export default Date
