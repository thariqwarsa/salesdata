import React, { Component } from 'react';
import multipleData from '../data/year-end.json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines } from 'react-vis';

export class MultipleLineChart extends Component {

  filterData(start, end) {
    const datas = multipleData.data.metric.clicks[0].data;
    let grab = false;
    let filteredData = [];

    for (let i = 0; i < datas.length; i++) {
      if (datas[i][0] === start) {
        grab = true;
      }
      if (grab) {
        filteredData.push({ x: datas[i][0].slice(0, 6), y: datas[i][1] })
      }
      if (datas[i][0] === end) {
        break;
      }
    }
    return filteredData;
  }

  render() {
    const data = this.filterData(this.props.startDate, this.props.endDate);
    console.log(data);

    return (
      <XYPlot
        className='MultipleLineChart'
        width={700}
        height={250}
        xType="ordinal"
      >
        <XAxis />
        <YAxis />
        <HorizontalGridLines />
        <LineSeries data={data} />
      </XYPlot>
    )
  }
}

export default MultipleLineChart
