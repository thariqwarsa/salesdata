import React, { Component } from 'react';
import multipleData from '../data/year-end.json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, DiscreteColorLegend } from 'react-vis';

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
    const account_names = datas.map(d => d.account_name);

    return (
      <div className="MultipleLineChart">
        <XYPlot
          xType="ordinal"
          className='MultipleLineChart'
          width={700}
          height={200}

        >
          <XAxis />
          <YAxis />

          <HorizontalGridLines />
          {
            datas.length && datas.map(d => {
              return (<LineSeries key={d.account_name} data={d.data} curve={'curveMonotoneX'} />)
            })
          }
        </XYPlot>
        {/* <div className='legend'>
          <DiscreteColorLegend items={account_names.slice(0, 8)}
            orientation='horizontal' width={600} />
          <DiscreteColorLegend items={account_names.slice(8)}
            orientation='horizontal' width={600} />
        </div> */}
      </div>
    )
  }
}

export default MultipleLineChart