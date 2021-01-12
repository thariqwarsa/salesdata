import React, { Component } from 'react'
import singleData from '../data/year-end(single-client).json';

export class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.startDate !== this.props.startDate
      || prevProps.endDate !== this.props.endDate
    ) {
      this.filterData("03 Nov 2019", "18 Nov 2019");
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
        filteredData.push(datas[i])
      }
      if (datas[i][0] === end) {
        break;
      }
    }
    this.setState({ data: filteredData });
    console.log(this.state.data)
  }

  render() {
    return (
      <div className='BarChart'>
      </div>
    )
  }
}

export default BarChart
