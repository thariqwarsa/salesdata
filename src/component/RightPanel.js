// ============== RIGHT PANEL ============== 
// this component take start date and end date, and also data from year-end(single-client).json
// then, the data will be processed and visualized as number, percentage, and pie chart
// the data processing is completely unrelated to any goals. just to show the result will change based on dates

import React, { Component } from 'react';

// import data
import { data } from '../data/year-end(single-client).json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import { RadialChart } from 'react-vis';

export class RightPanel extends Component {

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

    let min = Math.min(...filteredData);
    let max = Math.max(...filteredData);
    let sum = filteredData.reduce((a, b) => a + b, 0);
    let avg = Math.round(sum / filteredData.length);
    let first = filteredData[0];
    let last = filteredData[filteredData.length - 1];

    return {
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
      radialData: [
        { angle: max, innerRadius: 0.7, color: '#4285F4' },
        { angle: first, innerRadius: 0.7, color: '#f4b400' },
        { angle: min, innerRadius: 0.7, color: '#db4437' }
      ]
    }
  }

  render() {
    const { numData, radialData } = this.analyzeData(this.props.startDate, this.props.endDate);

    return (
      <div className='RightPanel'>
        <div className="card">
          <div className="title">Sales Summary</div>
          <div className="card-body">
            {
              numData.map((d, index) => {
                return (
                  <div key={d.name}>
                    {index > 0 && (<hr></hr>)}
                    <div className="card-text sub-title">{d.name}</div>
                    <div className="card-title">{d.total}</div>
                    <div className={`card-text ${d.perc > 0 ? 'increment' : 'decrement'}`}>
                      {d.perc > 0 && '+'}{d.perc}%
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <RadialChart
          width={160}
          height={160}
          data={radialData}
          colorType='literal'
        />
      </div >
    )
  }
}

export default RightPanel
