// ============ SALES OVERVIEW COMPONENT ============  //
// this component take datas from sales-overview.json and display it.
// the datas is not processed and not dynamic.

import React, { Component } from 'react';
// import data from sales-overview,json
import { data } from '../data/sales-overview.json'

export class SalesOverview extends Component {
  render() {
    const {
      order_cancel,
      order_paid,
      order_pending,
      today_sales,
      total_cancel,
      total_pending
    } = data

    return (
      <div className='SalesOverview'>
        <div className='container'>

          <div className="row">
            <div className="col-sm-4">
              <div className="card paid">
                <div className="card-body">
                  <p className="card-text">Sales <span>{order_paid} Paid Order</span></p>
                  <h5 className="card-title">Rp. {today_sales.toLocaleString(['ban', 'id'])}</h5>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="card cancel">
                <div className="card-body">
                  <p className="card-text">Cancel <span>{order_cancel} Orders</span></p>
                  <h5 className="card-title">Rp. {total_cancel.toLocaleString(['ban', 'id'])}</h5>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="card pending">
                <div className="card-body">
                  <p className="card-text">Pending <span>{order_pending} Orders</span></p>
                  <h5 className="card-title">Rp. {total_pending.toLocaleString(['ban', 'id'])}</h5>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default SalesOverview

