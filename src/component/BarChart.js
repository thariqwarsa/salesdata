import React, { Component } from 'react'
// import data from json
import singleData from '../data/year-end(single-client).json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, LabelSeries } from 'react-vis';

export class BarChart extends Component {
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
        filteredData.push({ x: datas[i][0].slice(0, 6), y: datas[i][1] })
      }
      if (datas[i][0] === end) {
        break;
      }
    }
    return filteredData;
  }

  render() {
    const data = this.filterData("03 Nov 2019", "10 Nov 2019")

    return (
      <div className='BarChart'>
        <XYPlot
          width={700}
          height={250}
          xType="ordinal"
        >

          <XAxis />
          <YAxis />
          <VerticalBarSeries
            data={data}
          />
        </XYPlot>
      </div>
    )
  }
}

export default BarChart