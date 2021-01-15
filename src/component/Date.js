// ============ DATE COMPONENT ============  //
// this component is used for pick date range as startDate and endDate. 
// then, send them to parent (App.js)

import React, { Component } from 'react';

// import date picker
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// import moment
import * as moment from 'moment';

// import data from json to get range_date array
import { data } from '../data/year-end(single-client).json';

export class Date extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: null, endDate: null, maxDate: null, minDate: null }
  }

  // if the component is mounted, change startDate and endDate state.
  // then, send startDate and endDate to parent (App.js)
  componentDidMount() {
    // grab array of range_date from year-end(single-client).json
    const { range_date } = data;
    // change startDate and endDate state. the date picker will adjust to the new dates
    this.setState({
      // set endDate to be last element of range_date
      endDate: moment(range_date[range_date.length - 1]),
      // set endDate to be 7th last element of range_date
      startDate: moment(range_date[range_date.length - 8]),
      // maxDate and minDate will be used at DateRangePicker component
      maxDate: moment(range_date[range_date.length - 1]),
      minDate: moment(range_date[0])

    }, () =>
      // after states is set (this.setState is async function),
      // call homeCallback function from props to send startDate and endDate to App.js 
      this.props.homeCallback(
        // since the startDate and endDate are moment object, change their format to DD MMM YYYY
        this.state.startDate.format('DD MMM YYYY'),
        this.state.endDate.format('DD MMM YYYY')
      )
    )
  }

  // if dates at DateRangePicker is changed,
  handleChangeDate(startDate, endDate) {
    // change startDate and endDate states
    this.setState({ startDate, endDate }, () => {
      // if startDate AND endDate is NOT null,
      if (startDate && endDate) {
        // call homeCallback function from props to send startDate and endDate to App.js 
        this.props.homeCallback(
          // change format of moment object
          startDate.format('DD MMM YYYY'),
          endDate.format('DD MMM YYYY')
        );
      }
    })
  }

  render() {
    // grab minDate and maxDate from state
    const { minDate, maxDate } = this.state;

    return (
      <div className='Date'>
        {/* 
          the two important props from DateRangePicker that used are: 
            - onDateschange: if the dates change, call handleDateChange function
            - isOutsideRange: 
                take a function to check all days available on calendar.
                if a day return true, that day can't be selected.
                in this case, it checks wether a day is after or equal to minDate AND before or equal to maxDate.
        */}
        <DateRangePicker
          startDate={this.state.startDate}
          startDateId="your_unique_start_date_id"
          endDate={this.state.endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={({ startDate, endDate }) => this.handleChangeDate(startDate, endDate)}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          isOutsideRange={
            (day) => !day.isBetween(minDate, maxDate, undefined, [])
          }
        />
      </div >
    )
  }
}

export default Date;
