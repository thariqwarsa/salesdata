import React, { Component } from 'react';

// import date picker
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import * as moment from 'moment';

// import start and end date from .json
import { data } from '../data/year-end(single-client).json';


export class Date extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: null, endDate: null }
  }

  handleChangeDate(startDate, endDate) {
    this.setState({ startDate, endDate }, () => {
      if (startDate !== null && endDate !== null) {
        this.props.homeCallback(
          startDate.format('DD MMM YYYY'),
          endDate.format('DD MMM YYYY')
        );
      }
    })
  }

  componentDidMount() {
    const { range_date } = data;
    this.setState({
      startDate: moment(range_date[range_date.length - 8]),
      endDate: moment(range_date[range_date.length - 1])
    }, () =>
      this.props.homeCallback(
        this.state.startDate.format('DD MMM YYYY'),
        this.state.endDate.format('DD MMM YYYY')
      )
    )
  }

  render() {
    return (
      <div className='Date' style={{ float: 'right' }}>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.handleChangeDate(startDate, endDate)} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          isOutsideRange={() => false}
        />
      </div >
    )
  }
}

export default Date;
