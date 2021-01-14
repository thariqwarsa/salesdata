import React, { Component } from 'react';
import dynamic from '../data/year-end(single-client).json';
import overview from '../data/sales-overview.json'

export class RightPanel extends Component {

  analyzeData(start, end) {
    const datas = dynamic.data.data[0].data;
    const { order_cancel, order_paid, order_pending, today_sales,
      total_cancel, total_pending, total_shipping } = overview.data;
    let filteredData = []
    let grab = false;

    for (let i = 0; i < datas.length; i++) {
      if (datas[i][0] === start) grab = true;
      if (grab) filteredData.push(datas[i][1])
      if (datas[i][0] === end || i == datas.length - 1) break;
    }

    let min = Math.min(...filteredData);
    let max = Math.max(...filteredData);
    let sum = filteredData.reduce((a, b) => a + b, 0);
    let avg = Math.round(sum / filteredData.length);
    let first = filteredData[0];
    let last = filteredData[filteredData.length - 1];

    return [
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
    ]
  }

  render() {
    const datas = this.analyzeData(this.props.startDate, this.props.endDate);

    return (
      <div className='RightPanel'>
        <div className="card">
          <div className="title">Sales Summary</div>
          <div className="card-body">
            {
              datas.map((d, index) => {
                return (
                  <div>
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
      </div >
    )
  }
}

export default RightPanel
