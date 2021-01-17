# SALES DATA VISUALIZATION DASHBOARD

Sales Data Visualization (SVD) is a web app to visualize data dynamically based on selected date range.
This project use [React JS](https://reactjs.org/) styled with [Bootstrap 4](https://getbootstrap.com/) for creating responsive page.
[react-dates](https://github.com/airbnb/react-dates) is used for pick date range.
The datas is visualize using [react-vis](https://uber.github.io/react-vis/) library.

## INSTALLATION

1. clone this repository with `git clone https://github.com/thariqwarsa/salesdata.git `
2. on your local terminal, install dependencies with `npm install`
3. on cloned project root directory, start server with `npm start`
4. Starting server will take a while. The app will launched automatically on your default browser.

## FOLDER STRUCTURE

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

## DATA FLOWS

The data flow of SVD is as follow:

```
       startDate,          startDate,
       endDate             endDate
Date ------------> App
                    ├──---------------> SingleBarChart
                    ├──---------------> MultipleLineChart
                    └──---------------> RightPanel
```

in general, this app take date range as user input from Date.js.
The date range (startDate and endDate) will be passed to its parent (App.js) as props. Then, those props will passed again to SingleBarchart, MultipleLineChart, and RightPanel component.
each component will fetch data from respective json at `/data` directory.
Then, using startDate and endDate from props, each component will parse the data and display it as chart or number.

Detailed explanation is provided on each components as comments.
