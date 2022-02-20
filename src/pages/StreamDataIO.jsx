import React, { Component } from 'react'

import 'react-table-6/react-table.css'
import styled from 'styled-components'

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

let eventSource =
    streamdataio.createEventSource(targetUrl, appToken, [], AuthStrategy.newSignatureStrategy(appToken, privateKey));
let stockresults = [];
let strresults = '';



class StreamDataIO extends Component {
    constructor(props) {
        super(props);
        this.state={
            results: [],
            loading: true
        }

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
                //this.setState({results: stockresults})
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
                strresults = JSON.stringify(stockresults);
                // do whatever you wish with the update data
                //this.setState({results: stockresults.toJSON()})
                //print.printTable(stockresults);
                //print.printTable(stockresults);


            })

            // the standard 'error' callback will be called when an error occur with the evenSource
            // for example with an invalid token provided
            .onError(function (error)
            {
                console.log('ERROR!', error);
                eventSource.close();

            });

        this.forceUpdate();
        eventSource.open();
    }

    // Enable manual refresh click button
    handleClick = () => {
        this.setState({ mssg: "Refresh Manually" });
    };

    componentDidMount () {
        this.getResults()

    }

    componentWillUnmount() {
        //clearInterval(this.timerID);
    }

    render() {

        return (
            <Wrapper>
                <Title>Stock Stream Data from StreamData.io using SSE</Title>
            <div>
                <button onClick={this.handleClick}>Manual Refresh</button><br/>
                <p>{strresults}</p>

            </div>
            </Wrapper>
        );
    }
}


export default StreamDataIO
