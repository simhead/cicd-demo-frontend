import React, {Component} from 'react'
import api from '../api'
import axios from 'axios'

import "./Devices.css";
import styled from "styled-components";
import ReactTable from "react-table-6";

const View = styled.div`
    color: #33FF5E;
    cursor: pointer;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateDevice extends Component {
    updateDevice = event => {
        event.preventDefault()

        window.location.href = `/device/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateDevice}>Update</Update>
    }
}

class ViewDevice extends Component {
    viewDevice = event => {
        event.preventDefault()

        window.location.href = `/device/view/${this.props.id}`
    }

    render() {
        return <View onClick={this.viewDevice}>View</View>
    }
}

class DeleteDevice extends Component {
    deleteDevice = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the Device ${this.props.id} permanently?`,
            )
        ) {
            api.deleteDeviceById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteDevice}>Delete</Delete>
    }
}

class Devices extends Component {
    constructor(props){
        super(props);
        this.state={
            devices: [],
            loading: true
        }
    }

    async getAllDevices(){
        const res = await axios.get('http://ec2-15-165-48-131.ap-northeast-2.compute.amazonaws.com:9000/soynet/api/devices')
        console.log(res.data)
        this.setState({loading:false, devices: res.data.data})
    }

    componentDidMount = async () => {
        await this.getAllDevices()
    }

    render() {
        const columns = [
            /*{
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },*/
            {
                Header: 'Device Name',
                accessor: 'deviceName',
                filterable: true,
            },
            {
                Header: 'Device ID',
                accessor: 'deviceId',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <ViewDevice id={props.original._id} />
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <UpdateDevice id={props.original._id} />
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <DeleteDevice id={props.original._id} />
                    )
                },
            },
        ]

        return (
            <div className="App">
                <br/>  Device Table
                <ReactTable
                    data={this.state.devices}
                    columns={columns}
                    defaultPageSize={10}
                    showPageSizeOptions={true}
                    minRows={0}
                />

            </div>

        );
    }
}

export default Devices
