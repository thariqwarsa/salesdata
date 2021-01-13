import React, { Component } from 'react'
// import data from json
import singleData from '../data/year-end(single-client).json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, LabelSeries } from 'react-vis';

export class SingleBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  filterData(start, end) {
    const datas = singleData.data.data[0].data;
    let grab = false;
    let filteredData = [];

    for (let i = 0; i < datas.length; i++) {
      if (datas[i][0] === start) {
        grab = true;
      }
      if (grab) {
        filteredData.push({
          // Data related keys
          x: datas[i][0].slice(0, 6), y: datas[i][1],
          // Label and style related keys
          label: datas[i][1].toString(), style: { fontSize: 12 }
        })
      }
      if (datas[i][0] === end) {
        break;
      }
    }
    return filteredData;
  }

  render() {
    const data = this.filterData(this.props.startDate, this.props.endDate)
    // const data = this.filterData('09 Sep 2020', '17 Sep 2020')

    return (
      <XYPlot
        className='SingleBarChart'
        width={700}
        height={250}
        xType="ordinal"
      >
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          barWidth={0.6}
          data={data}
        />
        <LabelSeries data={data} />

      </XYPlot>
    )
  }
}

export default SingleBarChart
