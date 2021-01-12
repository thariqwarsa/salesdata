import React, { Component } from 'react';
// import rangeDate from '../data/year-end.json';

// import redux and actions
import { connect } from 'react-redux';
import * as actions from '../actions';

// import date picker
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


export class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: ''
    }
  }
  // componentDidUpdate = (prevProps) => {
  //   if (
  //     prevProps.date.startDate !== this.state.startDate
  //     || prevProps.date.endDate !== this.state.endDate
  //   ) {
  //     const start = !!this.state.startDate ? this.state.startDate.format('DD MMM YYYY') : '';
  //     const end = !!this.state.endDate ? this.state.endDate.format('DD MMM YYYY') : '';
  //     // this.props.updateDate(start, end);
  //   }
  // }

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
          isOutsideRange={() => false}
        />
      </div >
    )
  }
}

function mapStateToProps({ date }) {
  return { date };
}

export default connect(mapStateToProps, actions)(Date);
