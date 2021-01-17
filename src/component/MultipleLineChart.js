// ============== MULTIPLE LINE CHART ============== 
// this component treceive (startDate and endDate) from App.js, 
// use them to parse data from year-end.json, and visualized it as dynamic multiple linechart
// this compont has a bug. the crosshair is not moving to corresponding x axis. the contain is still changed

import React, { Component } from 'react';
// import data from year-end.json
import { data } from '../data/year-end.json';

// import react-vis
import '../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
  DiscreteColorLegend,
  Crosshair
} from 'react-vis';

export class MultipleLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = { crosshairValue: null, hoveredDate: null }
  }

  // recieve startDate and endDate as arguments for parsing data from year-end.json
  // return parsed data for Linechart and Crosshair component.
  // retuned data has following structure:

  // lineData =  [
  //   { clientName, data: [{ x: date, x: y }, { date, y }... ] }, 
  //   ...
  // ]

  // crosshairData = [
  //   { date, data: [{ account_name, value }, { account_name, value }, ... ]}, 
  //   ...
  // ]

  filterData(start, end) {
    // grab the raw data
    const rawData = Object.values(data.metric.clicks);
    // initialize a variable as flag to start storing data
    let grab;
    // initialize object to store a client's data
    let currentClient = {};
    // initialize final data to be returned
    let lineData = [];
    // initiazlize number of client 
    let clientNum = 4;

    // PARSE DATA FOR LINECHART

    // loop through rawData, grab first 4 client
    for (let i = 0; i < clientNum; i++) {
      // initialize new object to be filled
      currentClient = { 'account_name': rawData[i].account_name, 'data': [] };
      // initiate grab to false
      grab = false;
      // loop through each client's data
      for (let j = 0; j < rawData[i].data.length; j++) {
        // if the date match startDate, set flag as true
        if (rawData[i].data[j][0] === start) {
          grab = true;
        }
        // if the flag is true, start parisng the data.
        if (grab) {
          currentClient.data.push({
            // set date as x (excluding year)
            x: rawData[i].data[j][0].slice(0, 6),
            // set the value as y
            y: rawData[i].data[j][1],
            // add the account name
            account_name: rawData[i].account_name
          });
        }
        // if the date match endDate, break the loop
        if (rawData[i].data[j][0] === end) break;
      }
      // push current client data to lineData
      lineData.push(currentClient);
    }

    // PARSE DATA FOR CROSSHAIR

    // initialize object to store date's data
    let currentDate = {};
    // initialize final object to be returned
    let crosshairData = [];
    // initialize flag
    grab = false;

    // loop through data of first element of lineData
    for (let i = 0; i < lineData[0].data.length; i++) {
      // initialize data format for current date
      currentDate = {
        //  set date as x
        x: lineData[0].data[i].x,
        data: []
      }
      // loop through account name on lineData
      for (let j = 0; j < lineData.length; j++) {
        currentDate.data.push({
          // grab the account name
          account_name: lineData[j].account_name,
          // grab the value
          y: lineData[j].data[i].y
        });
      }
      crosshairData.push(currentDate);
    }

    return { lineData, crosshairData };
  }

  render() {
    // grab array of data for linechart and cross hair with filtered data function,
    // pass startDate and endDate from props as arguments
    const { lineData, crosshairData } = this.filterData(this.props.startDate, this.props.endDate);
    // grab crosshairValue and hovered data from state for crosshair
    const { crosshairValue, hoveredDate } = this.state;

    return (
      <div className="MultipleLineChart" >
        <XYPlot
          xType="ordinal"
          className='MultipleLineChart'
          width={600}
          height={200}
          // if mouse leave XY plot area, clear the states to remove crosshair
          onMouseLeave={() => this.setState({ crosshairValue: null, hoveredDate: null })}
        >
          <XAxis
            // manage too many label on x axios by limit it if the data have length more than 18
            tickFormat={(t, i) => {
              if (lineData[0].data.length < 18) return t.split(',')[0];
              if ((i + 1) % 5 === 0) return t.split(',')[0];
              else return;
            }}
          />
          <YAxis />
          <HorizontalGridLines />

          {
            // if lineData is available, map it and make lineChart for each account_name
            lineData.length && lineData.map(d => {
              return (
                <LineSeries
                  key={d.account_name}
                  data={d.data}
                  curve={'curveMonotoneX'}
                  // if the mouse hovered on this component, set the states to show crosshair
                  onNearestX={
                    (value, { index }) => this.setState({
                      crosshairValue: crosshairData[index],
                      hoveredDate: value.x
                    })
                  }
                />
              )
            })
          }
          {
            // if the crosshairValue state is not null, show crosshair 
            // and y value of each account name on hovered x axis
            crosshairValue &&
            <Crosshair values={crosshairData} >
              <div
                className='crosshair'
                style={{
                  backgroundColor: 'white',
                  width: '12em',
                  borderRadius: '2px',
                  boxShadow: '2px 2px 3px #8d8d8d',
                  border: '1px solid #808080',
                  padding: '1em',
                  color: '#707070'
                }}
              >
                <div
                  style={{
                    fontWeight: '600',
                    fontSize: '1.2em',
                    marginBottom: '0.4em'
                  }}
                >
                  {hoveredDate}
                </div>
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

        {/* Legend */}
        <div className='legend'>
          <DiscreteColorLegend
            items={lineData.map(d => d.account_name)}
            orientation='horizontal'
            width={600}
          />
        </div>
      </div >
    )
  }
}

export default MultipleLineChart
