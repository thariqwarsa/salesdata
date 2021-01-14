import React, { Component } from 'react';
import { data } from '../data/year-end(single-client).json';


export class RightPanel extends Component {

  render() {

    return (
      <div className='RightPanel'>
        <div className="card">
          <div className="title">Sales Summary</div>
          <div className="card-body">
            <div className="card-text sub-title">Total Sales</div>
            <div className="card-title">Rp. 12.000.000</div>
            <div className="card-text">+20%</div>
            <hr></hr>
            <div className="card-text sub-title">Paid Order</div>
            <div className="card-title">Rp. 12.000.000</div>
            <div className="card-text">+20%</div>
            <hr></hr>
            <div className="card-text sub-title">Cancel Order</div>
            <div className="card-title">Rp. 12.000.000</div>
            <div className="card-text">+20%</div>
            <hr></hr>
            <div className="card-text sub-title">Pending Amount</div>
            <div className="card-title">Rp. 12.000.000</div>
            <div className="card-text">+20%</div>
            <hr></hr>
            <div className="card-text sub-title">Pending Order</div>
            <div className="card-title">Rp. 12.000.000</div>
            <div className="card-text">+20%</div>
            <hr></hr>
            <div className="card-text sub-title">Shipping</div>
            <div className="card-title">Rp. 12.000.000</div>
            <div className="card-text">+20%</div>
          </div>

        </div>
      </div >
    )
  }
}

export default RightPanel
