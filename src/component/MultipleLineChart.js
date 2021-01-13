import React, { Component } from 'react';
import multipleData from '../data/year-end.json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines } from 'react-vis';

export class MultipleLineChart extends Component {

  filterData(start, end) {
    const datas = Object.values(multipleData.data.metric.clicks);
    let grab = false;
    let allData = [];
    let clientData = {};

    for (let i = 0; i < datas.length; i++) {
      clientData = { 'account_name': datas[i].account_name, 'data': [] }
      grab = false;
      for (let j = 0; j < datas[i].data.length; j++) {
        if (datas[i].data[j][0] === start) grab = true;
        if (grab) clientData.data.push({ x: datas[i].data[j][0].slice(0, 6), y: datas[i].data[j][1] })
        if (datas[i].data[j][0] === end) break;
      }
      allData.push(clientData);
    }
    return allData;
  }

  render() {
    const datas = this.filterData(this.props.startDate, this.props.endDate);
    console.log(datas);
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
        {
          datas.length && datas.map(d => {
            return (<LineSeries data={d.data} />)
          })
        }
      </XYPlot>
    )
  }
}

export default MultipleLineChart
