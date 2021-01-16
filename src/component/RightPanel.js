// ============== RIGHT PANEL ============== 
// this component take start date and end date, and also data from year-end(single-client).json
// then, the data will be processed and visualized as number, percentage, and radial chart
// the data processing is completely unrelated to any goals. just to show the result will change based on dates

import React, { Component } from 'react';

// import data
import { data } from '../data/year-end(single-client).json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, RadialChart, DiscreteColorLegend, Hint } from 'react-vis';

export class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null }
    this.rememberValue = this.rememberValue.bind(this);
    this.forgetValue = this.forgetValue.bind(this);
  }

  // analyzeData function take start and end date as argument 
  // and create processed data to feed to top section(s) of right panel
  analyzeData(start, end) {
    const datas = data.data[0].data;
    let filteredData = [];
    let grab = false;

    for (let i = 0; i < datas.length; i++) {
      if (datas[i][0] === start) {
        grab = true;
      }
      if (grab) {
        filteredData.push(datas[i][1])
      }
      if (datas[i][0] === end) break;
    }

    // find min, max, sum, average, first, and last element of filteredData array
    let min = Math.min(...filteredData);
    let max = Math.max(...filteredData);
    let sum = filteredData.reduce((a, b) => a + b, 0);
    let avg = Math.round(sum / filteredData.length);
    let first = filteredData[0];
    let last = filteredData[filteredData.length - 1];

    // returned data consist of 2 parts: numData and radialData
    return {
      // NUMDATA is array of object that will be feed to for each sections on top of right panel.
      // name: title of each section
      // total: number of each section (currency or normal number)
      // perc: percantage
      numData: [
        {
          name: 'Total Sales',
          total: `Rp. ${(sum * 1000).toLocaleString(['ban', 'id'])}`,
          perc: ((max - min) / sum * 100).toFixed(1)
        },
        {
          name: 'Paid Order',
          total: max,
          perc: ((max - 1000) / 100).toFixed(1)
        },
        {
          name: 'Cancel Order',
          total: min,
          perc: ((min - 1000) / 100).toFixed(1)
        },
        {
          name: 'Pending Amount',
          total: `Rp. ${(avg * 1000).toLocaleString(['ban', 'id'])}`,
          perc: ((avg - 1000) / 100).toFixed(1)
        },
        {
          name: 'Pending Order',
          total: first - 1000,
          perc: ((first - 1000) / 100).toFixed(1)
        },
        {
          name: 'Shipping',
          total: `Rp. ${(last * 1000).toLocaleString(['ban', 'id'])}`,
          perc: ((last - 1000) / 100).toFixed(1)
        }
      ],
      // RADIAL DATA is feed to radial chart
      // angle: a num to be converted as portion of radial degree by RadialChart component
      // innerRadius: to create donut shape
      // color: color of each data
      // title: name of each data for labeling
      radialData: [
        { title: 'Awareness', angle: max, innerRadius: 0.7, color: '#4285F4' },
        { title: 'Traffics', angle: first, innerRadius: 0.7, color: '#f4b400' },
        { title: 'Contention', angle: max - min, innerRadius: 0.7, color: '#db4437' }
      ]
    }
  }

  rememberValue(value) {
    console.log(value);
    this.setState({ value: value })
  }

  forgetValue() {
    this.setState({ value: null })
  }

  render() {
    // grab numData and radialData from analyzeData function
    // analyzeData function takes startDate and endDate as props from parent (App.js);
    const { numData, radialData } = this.analyzeData(this.props.startDate, this.props.endDate);
    // parse radialData for DiscreteColorLegend 
    const labels = radialData.map(d => {
      return { title: d.title, color: d.color, strokeWidth: 4 }
    });

    return (
      <div className='RightPanel' >
        <div className="card">
          <div className="title">Sales Summary</div>
          <div className="card-body">
            {/* 
              map numData to create each sections on top of right panel
            */}
            {
              numData.map((d, index) => {
                return (
                  <div key={d.name}>
                    {index > 0 && (<hr></hr>)}
                    <div className="card-text sub-title">{d.name}</div>
                    <div className="card-title">{d.total}</div>
                    {/* set font color to green if perc is positive. otherwise, red */}
                    <div className={`card-text ${d.perc > 0 ? 'increment' : 'decrement'}`}>
                      {d.perc > 0 && '+'}{d.perc}%
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='chart-title'>Budget Chart</div>

        <RadialChart
          animation
          width={160}
          height={160}
          data={radialData}
          colorType='literal'
          onValueMouseOver={this.rememberValue}
          onValueMouseOut={this.forgetValue}
        >
          {
            this.state.value &&
            (
              <Hint value={this.state.value}>
                <div style={{ color: this.state.value.color }}>
                  {this.state.value.title}: 100%
                </div>
              </Hint>
            )
          }
        </RadialChart>
        <DiscreteColorLegend
          className='legend'
          items={labels}
          orientation='vertical' width={160}
        />

      </div >
    )
  }
}

export default RightPanel
