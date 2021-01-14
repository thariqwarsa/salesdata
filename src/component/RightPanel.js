import React, { Component } from 'react';
import dynamic from '../data/year-end(single-client).json';
import overview from '../data/sales-overview.json'

export class RightPanel extends Component {

  analyzeData(start, end) {
    const datas = dynamic.data.data[0].data;
    const { order_cancel, order_paid, order_pending, today_sales,
      total_cancel, total_pending, total_shipping } = overview.data;
    let filterdData = []
    let grab = false;

    for (let i = 0; i < datas.length; i++) {
      if (datas[i][0] === start) grab = true;
      if (grab) filterdData.push(datas[i][1])
      if (datas[i][0] === end || i == datas.length - 1) break;
    }

    let min = Math.min(...filterdData);
    let max = Math.max(...filterdData);
    let sum = filterdData.reduce((a, b) => a + b, 0);
    let first = filterdData[0]
    let last = filterdData[filterdData.length - 1]

    return [
      {
        name: 'Total Sales',
        total: sum * 1000,
        perc: (max - min) / sum * 100
      },
      {
        name: 'Paid Order',
        total: 0,
        perc: 0
      },
      {
        name: 'Cancel Order',
        total: 0,
        perc: 0
      },
      {
        name: 'Pending Amount',
        total: 0,
        perc: 0
      },
      {
        name: 'Pending Order',
        total: 0,
        perc: 0
      },
      {
        name: 'Shipping',
        total: 0,
        perc: 0
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
                    <div className="card-title">Rp. {d.total.toLocaleString(['ban', 'id'])}</div>
                    <div className="card-text">{d.perc}%</div>
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
