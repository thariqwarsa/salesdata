// ======= SINGLE BAR CHART ===========
// this component takes startDate and endDate props from parent (App.js)
// then, it used them to filter and format data from year-end(single-client).json
// finally, it visualize the data as labelled barchart

import React, { Component } from 'react';

// import data from json
import { data } from '../data/year-end(single-client).json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, XAxis, LabelSeries } from 'react-vis';

// import moment
import * as moment from 'moment';

export class SingleBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] }
  }

  // filterData function accepts start date and end date, 
  // then use them to return filtered and formatted data from year-end(single-client).json 
  filterData(start, end) {
    // get array of data from year-end(single-client).json
    let datas = data.data[0].data;
    // filter the data by determine if each moment of date is in (inclusively) between start and end date
    let filteredData = datas.filter(
      d => moment(d[0]).isBetween(moment(start), moment(end), undefined, [])
    );
    // format the data to suit format of VerticalBarSeries and LabelSeries components
    return filteredData.map(d => {
      // for each point, data property of both components need:
      return {
        // date  (d[0]) as x value, excluding year
        x: d[0].slice(0, 6),
        // number (d[1]) as y value
        y: d[1],
        // number as label's name. converted to stirng
        label: d[1].toString(),
        // label's style
        style: { fontSize: '11px' }
      }
    });
  }

  render() {
    // take startDate and endDate from props
    // and used them to get filtered and formatted data from year-end(single-client).json
    const datas = this.filterData(this.props.startDate, this.props.endDate)

    return (
      <XYPlot
        className='SingleBarChart'
        width={600}
        height={200}
        xType="ordinal"
      >
        <XAxis />
        {/* feed datas as props */}
        <VerticalBarSeries
          barWidth={0.6}
          data={datas}
          color='#4285f4'
        />
        {/* feed datas as props */}
        <LabelSeries
          data={datas}
          labelAnchorX="middle"
          labelAnchorY="text-before-edge"
        />
      </XYPlot>
    )
  }
}

export default SingleBarChart
