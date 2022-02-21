import React, { Component } from 'react'

import 'react-table-6/react-table.css'
import styled from 'styled-components'
import ReactTable from "react-table-6";
import 'bootstrap/dist/css/bootstrap.min.css';

const Title = styled.h4.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 10px;
`
// add EventSource dependency
var streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
var AuthStrategy = require('streamdataio-js-sdk-auth');
// add json patch dependency
var jsonPatch = require('fast-json-patch');
//var print = require('node-print');

// targetUrl is the JSON API you wish to stream
// you can use this example API which simulates updating stocks prices from a financial market
var targetUrl = 'http://stockmarket.streamdata.io/v2/prices';

// appToken is the way Streamdata.io authenticates you as a valid user.
// you MUST provide a valid token for your request to go through.
var appToken = 'ODU1ODc3NzgtM2EwMS00ZmJlLThhNTMtODFiOTY3ZGViZjBh';
var privateKey = 'YTQ4MDIzMDYtZjI0My00YTliLTkzMTgtMjVkOTFhMzlmNzcwYTc0MWNiZjMtNWVkZS00MjQ2LTgzOTUtMjU3OTAyMzY3NjAz';

let stockresults = [];
let strresults = '';
let eventSource =
    streamdataio.createEventSource(targetUrl, appToken, [], AuthStrategy.newSignatureStrategy(appToken, privateKey));


class StreamDataIO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            loading: true
        }

        //this.handleOnPatch = this.handleOnPatch().bind(this);
    }

    setResults () {
        this.setState({results : strresults});
    }

    getResults () {
        eventSource
            // the standard 'open' callback will be called when connection is established with the server
            .onOpen(function ()
            {
                console.log("connected!");
            })
            // the streamdata.io specific 'data' event will be called when a fresh Json data set
            // is pushed by Streamdata.io coming from the API
            .onData(function (data)
            {
                console.log("data received");
                // memorize the fresh data set
                stockresults = data;
                console.log(stockresults);
                strresults = JSON.stringify(stockresults);

                //print.printTable(stockresults);

            })
            // the streamdata.io specific 'patch' event will be called when a fresh Json patch
            // is pushed by streamdata.io from the API. This patch has to be applied to the
            // latest data set provided.
            .onPatch(function (patch)
            {
                // display the patch
                console.log("patch: ", patch);
                // apply the patch to data using json patch API
                jsonPatch.applyPatch(stockresults, patch);
                console.log("UPDATE: ", stockresults);
                strresults = JSON.stringify(stockresults);
                //console.log("UPDATE in String: ", strresults);

                // do whatever you wish with the update data
                //this.setState({results: stockresults});
                //print.printTable(stockresults);
            })

            // the standard 'error' callback will be called when an error occur with the evenSource
            // for example with an invalid token provided
            .onError(function (error)
            {
                console.log('ERROR!', error);
                eventSource.close();

            });

        eventSource.open();
    }

    // Enable manual refresh click button
    handleClick = () => {
        this.setState({ mssg: "Refresh Manually" });
        //this.setState({results : strresults});
    };

    componentDidMount () {
        this.getResults();
        this.interval = setInterval(this.handleClick, 3000);

    }

    stopInterval() {
        clearInterval(this.interval);
    }

    componentWillUnmount() {
        this.stopInterval();
    }

    render() {
        const columns = [
            {
                Header: 'Ticker',
                accessor: 'ticker',
                filterable: true,
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Company',
                accessor: 'company',
            },
            {
                Header: 'Source',
                accessor: 'source',
            },
            {
                Header: 'Price',
                accessor: 'last',
            },
            {
                Header: 'Volume',
                accessor: 'volume',
            },
            {
                Header: 'Time',
                accessor: 'dt',
            },
        ]

        return (
            <Wrapper>
                <Title>Stock Stream Data from StreamData.io using SSE</Title>
            <div>
                <br/>  Stock prices in Real-time Table
                <ReactTable
                    data={stockresults}
                    columns={columns}
                    showPageSizeOptions={false}
                    showPaginationBottom={stockresults.length > 20 ? true: false}
                    minRows={0}
                /> <br/>
                <button onClick={this.handleClick}>Manual Refresh</button><br/>
            </div>
            </Wrapper>
        );
    }
}


export default StreamDataIO
