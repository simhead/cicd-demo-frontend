import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import api from '../api'
import activityapi from '../api/activity'

import styled from 'styled-components'

const Title = styled.h4.attrs({
    className: 'h4',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 10px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 10px 10px 10px 5px;
`

function date2str(x, y) {
    const z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return y.replace(/(y+)/g, function(v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}

class DeviceView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            deviceName: '',
            deviceId: '',
            location1: '',
            location2: '',
            status: '',
            createdatetime: '',
            updatedatetime: '',
            device: [],
            activities: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const { id } = this.state
        await api.getDeviceById(id).then(deviceById => {
            this.setState({
                deviceName: deviceById.data.data.deviceName,
                deviceId: deviceById.data.data.deviceId,
                location1: deviceById.data.data.location1,
                location2: deviceById.data.data.location2,
                status: deviceById.data.data.status,
                createdatetime: deviceById.data.data.createdatetime,
                updatedatetime: deviceById.data.data.updatedatetime,
                isLoading: false,
            })
        })
        const { deviceId } = this.state

        await activityapi.getActivityByDeviceId(deviceId).then(activitiesByDeviceId => {
            this.setState({
                activities: activitiesByDeviceId.data.data,
                isLoading: false,
            })
        })

    }

    render() {
        const { deviceName, deviceId, location1, location2, status, createdatetime, updatedatetime, activities, isLoading } = this.state

        const columns = [
            {
                Header: 'Device ID',
                accessor: 'deviceid',
            },
            {
                Header: 'Face ID',
                accessor: 'faceid',
                filterable: true,
            },
            {
                Header: 'Datetime',
                accessor: 'datetime',
                //this is the function custom tableCell
                Cell : (convertdate) => {
                    //props.value will convert the date
                    const dateObject = new Date(convertdate.value);
                    //const datetimeseries = dateObject.getTime()
                    const datetimeseries = date2str(dateObject, 'yyyy-MM-dd hh:mm:ss')
                    return datetimeseries
                }
            },
            {
                Header: 'Feature Vector',
                accessor: 'feature',
                Cell : (convertfeature) => {
                    let valout = '[';
                    for (let i = 0; i < convertfeature.value.length-1; i++)
                    {
                        valout += convertfeature.value[i]+', ';
                    }
                    valout += convertfeature.value[convertfeature.value.length-1]+']';
                    return valout
                }
            },
            {
                Header: 'Visit Count',
                accessor: 'visitcnt',
            },
            {
                Header: 'Stay Hour',
                accessor: 'stayhour',
            },
            {
                Header: 'Temperature',
                accessor: 'temperature',
            },
            {
                Header: 'Cough Count',
                accessor: 'coughcnt',
            },
            {
                id: 'maskflag',
                Header: 'Mask On or Off',
                accessor: d => d.maskflag.toString(),
            },
        ]

        let showTable = true
        if (!activities.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <Title>Device Details</Title>

                <p>Device Name: {deviceName}</p>
                <p>Device ID: {deviceId}</p>

                <Button onClick={event =>  window.location.href='/devices'}>Device List</Button>
                <LineChart width={1200} height={300} data={activities} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                    <Line type="monotone" dataKey="visitcnt" stroke="#8884d8" />
                    <Line type="monotone" dataKey="stayhour" stroke="#8884d8" />
                    <Line type="monotone" dataKey="coughcnt" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="datetime" />
                    <YAxis />
                    <Tooltip />
                </LineChart>

                {showTable && (
                    <ReactTable
                        data={activities}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={50}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}


            </Wrapper>
        )
    }
}

export default DeviceView
