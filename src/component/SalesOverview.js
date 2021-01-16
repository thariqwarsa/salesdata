import React, { Component } from 'react';
import overviewData from '../data/sales-overview.json'

export class SalesOverview extends Component {
  render() {
    const { order_cancel, order_paid, order_pending, today_sales,
      total_cancel, total_pending } = overviewData.data

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

