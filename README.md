# SALES DATA VISUALIZATION DASHBOARD

Sales Data Visualization (SVD) is a web app to visualize data dynamically based on selected date range.
This project use [React JS](https://reactjs.org/) styled with [Bootstrap 4](https://getbootstrap.com/).
DateRangePicker from [react-dates](https://github.com/airbnb/react-dates) is used for pick date range.
The datas is visualize using [react-vis](https://uber.github.io/react-vis/) library.

## Installation

1. clone this repository with `git clone https://github.com/thariqwarsa/salesdata.git ` on your local terminal
2. on cloned project's root directory, install dependencies with `npm install`
3. on cloned project's root directory, start server with `npm start`
4. Starting server will take a while. The app will launched automatically on your default browser (http://localhost:3000/)

## Folder Structure

```
.
├── ...
├── public/
│   └── index.html
└── src/
    ├── component/
    │   ├── Date.js
    │   ├── MultipleLineChart.js
    │   ├── RightPanel.js
    │   ├── RoutePanel.js
    │   ├── SalesOverview.js
    │   └── SingleBarChart.js
    ├── data/
    │   ├── sales-overview.json
    │   ├── year-end.json
    │   └── year-end(single-client).json
    ├── styles/
    │   └── App.css
    ├── App.js
    └── index.js

```

### `App.js`

stores all components, handle routing, and pass date range (startDate and endDate) from Date component to other components.

### `RoutePanel.js`

UI for selecting route

### `Date.js`

take date range (startDate and endDate) input from user and pass them to `App.js` as props.

### `MultipleLineChart.js`

receive date range (startDate and endDate) from `App.js`, use them to parse data from `year-end.json`, and visualized it as multiple linechart

### `SingleBarChart.js`

receive date range (startDate and endDate) from `App.js`, use them to parse data from `year-end(single-client).json`,and visualized it as single barchart

### `RightPanel.js`

receive date range (startDate and endDate) from `App.js`, use them to parse data from `year-end(single-client).json`,and visualized it as piechart and simple plain text

### `SalesOverview.js`

import data from `sales-overview.json` and display it, as it is.

more detailed explanations are provided on each components file as comments

## Data Flows

The data flow of this project is as follow:

```
       startDate,          startDate,
       endDate             endDate
Date ------------> App
                    ├──---------------> SingleBarChart
                    ├──---------------> MultipleLineChart
                    └──---------------> RightPanel
```

This app take date range as user input from Date.js. The date range (startDate and endDate) will be passed to its parent (App.js) as props. Then, those props will passed again to SingleBarchart, MultipleLineChart, and RightPanel component.
each component will fetch data from respective json at `/data` directory.
Then, using startDate and endDate from props, each component will parse the data and display it as chart or number.

Detailed explanation is provided on each components as comments.

## Bug and Flaw

1. The last date (01 October 2020) can't be selected on Date Range Picker
2. The date range should manually selected
3. crosshair of linechart not moving to hovered x axis
4. logic of MultipleLineChart component is not effective and efficient.
5. Too much data will cause cramp on x axis label and y label on SingleBarchart component
