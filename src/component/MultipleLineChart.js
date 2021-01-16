import React, { Component } from 'react';
import { data } from '../data/year-end.json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import {
  XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines,
  DiscreteColorLegend, Crosshair
} from 'react-vis';

export class MultipleLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = { crosshairValue: null, hoveredDate: null }
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onNearestX = this._onNearestX.bind(this);
  }

  filterData(start, end) {
    const rawData = Object.values(data.metric.clicks);
    let grab = false;
    let lineData = [];
    let clientData = {};
    let clientNum = 4;
    // create data for linechart
    for (let i = 0; i < clientNum; i++) {
      clientData = { 'account_name': rawData[i].account_name, 'data': [] };
      grab = false;

      for (let j = 0; j < rawData[i].data.length; j++) {
        if (rawData[i].data[j][0] === start) {
          grab = true;
        }
        if (grab) {
          clientData.data.push({
            x: rawData[i].data[j][0].slice(0, 6),
            y: rawData[i].data[j][1],
            account_name: rawData[i].account_name
          });
        }
        if (rawData[i].data[j][0] === end) break;
      }
      lineData.push(clientData);
    }
    // create data for crosshair
    let currentDate;
    let crosshairData = [];
    grab = false;

    for (let i = 0; i < lineData[0].data.length - 1; i++) {
      currentDate = {
        x: lineData[0].data[i].x,
        data: []
      }
      for (let j = 0; j < lineData.length; j++) {
        currentDate.data.push({
          account_name: lineData[j].account_name,
          y: lineData[j].data[i].y
        });
      }
      crosshairData.push(currentDate);
    }
    // [
    //   { clientName, data: [{ x: date, x: y }, { date, y }... ] }
    // ]

    // [
    //   { date: [{ client, value }, { client, value }... ] }
    // ]

    return { lineData, crosshairData };
  }

  _onMouseLeave() {
    this.setState({ crosshairValue: null });
  }

  _onNearestX(value) {
    this.setState({ crosshairValue: value });
  }

  render() {
    const { lineData, crosshairData } = this.filterData(this.props.startDate, this.props.endDate);
    const account_names = lineData.map(d => d.account_name);
    const { crosshairValue, hoveredDate } = this.state;

    return (
      <div className="MultipleLineChart" >
        <XYPlot
          xType="ordinal"
          className='MultipleLineChart'
          width={600}
          height={200}
        >
          <XAxis
            tickFormat={(t, i) => {
              if (lineData[0].data.length < 18) return t.split(',')[0];
              if ((i + 1) % 5 === 0) return t.split(',')[0];
              else return;
            }}
          />

          <YAxis />
          <HorizontalGridLines />
          {
            lineData.length && lineData.map(d => {
              return (
                <LineSeries
                  key={d.account_name}
                  data={d.data}
                  curve={'curveMonotoneX'}
                  onNearestX={(value, { index }) => this.setState({ crosshairValue: crosshairData[index], hoveredDate: value.x })}
                  onMouseLeave={() => this.setState({ crosshairValue: null, hoveredDate: null })}
                />
              )
            })
          }
          {
            crosshairValue &&
            <Crosshair values={crosshairData}>
              <div style={{ backgroundColor: 'white', border: '1px solid black', width: '12em' }}>
                <div>{hoveredDate}</div>
                {
                  crosshairValue.data.map(d => {
                    return (
                      <div key={d.account_name}>{d.account_name}: {d.y}</div>
                    )
                  })
                }
              </div>
            </Crosshair>
          }
        </XYPlot>
        <div className='legend'>
          <DiscreteColorLegend
            items={account_names}
            orientation='horizontal'
            width={600}
          />
        </div>
      </div >
    )
  }
}

export default MultipleLineChart
