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

class UserView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            faceid: '',
            mobile: '',
            email: '',
            address: '',
            user: [],
            activities: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const { id } = this.state
        await api.getUserById(id).then(userById => {
            this.setState({
                name: userById.data.data.name,
                faceid: userById.data.data.faceid,
                mobile: userById.data.data.mobile,
                email: userById.data.data.email,
                address: userById.data.data.address,
                isLoading: false,
            })
        })
        const { faceid } = this.state

        await activityapi.getActivityById(faceid).then(activitiesById => {
            this.setState({
                activities: activitiesById.data.data,
                isLoading: false,
            })
        })

    }

    render() {
        const { name, faceid, mobile, email, address, activities, isLoading } = this.state

        const columns = [
            {
                Header: 'FaceID',
                accessor: 'faceid',
            },
            {
                Header: 'Name',
                accessor: 'name',
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
                Header: 'Device ID',
                accessor: 'deviceid',
                filterable: true,
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
                <Title>User Details</Title>

                <p>Name: {name}</p>
                <p>FaceID: {faceid}</p>
                <p>Mobile number: {mobile}</p>
                <p>Email Address: {email}</p>
                <p>Address: {address}</p>

                <Button onClick={event =>  window.location.href='/users'}>User List</Button>
                <LineChart width={1200} height={300} data={activities} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="deviceid" stroke="#8884d8" />
                    <Line type="monotone" dataKey="feature" stroke="#8884d8" />
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

export default UserView
