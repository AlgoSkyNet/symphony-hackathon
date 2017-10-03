import React from 'react';
import * as https from 'https';
const moment = require('moment');
const Hypergrid = require('fin-hypergrid');

// props
// ticker -> string
// start -> dateString (2011-12-31)
// end -> dateString (2011-12-31)

const quandlApiKey = '-MYhiFVyBFQ-e8nuBY1Q';
const apiBaseUrl = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES?';

export default class PriceGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: this.props.ticker,
            date: this.generateDates(this.props.start, this.props.end)
        };
        this.urlString = this.urlString.bind(this);
        this.retrieveQuandlData();
    }

    retrieveQuandlData() {
        https.get(this.urlString(), (response) => {
            response.on('data', (data) => {
                const dataJson = JSON.parse(data.toString());
                const dataValues = dataJson.datatable.data;
                console.log(dataValues)
                const columnNames = dataJson.datatable.columns.map(column => {  return column.name });
                console.log(columnNames)
                const myGrid = new Hypergrid('#grid', { data: dataValues });
                console.log(myGrid)
                console.log('hello')
            });
        });
    }
    generateDates(startDate, endDate) {
        let start = moment(startDate);
        let end = moment(endDate);
        let dateString = `${start.year()}-${start.month() + 1}-${start.date()}`;

        while(start.diff(end) !== 0) {
            start.add(1, 'days');
            dateString += `%2C${start.year()}-${start.month() + 1}-${start.date()}`;
        }
        
        return dateString;
    }

    urlString() {
        return `${apiBaseUrl}ticker=${this.state.ticker}&api_key=${quandlApiKey}&date=${this.state.date}`;
    }

    render() {
        return (
            <div id='grid'></div>
        );
    }
}
