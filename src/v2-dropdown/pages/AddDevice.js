import React, { Component } from 'react'
import api from '../../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class AddDevice extends Component {
    constructor(props) {
        super(props)

        const datetime = new Date();
        this.state = {
            deviceName: '',
            deviceId: '',
            location1: '',
            location2: '',
            status: '',
            createdatetime: datetime.toISOString(),
            updatedatetime: datetime.toISOString()
        }

    }

    handleChangeInputDeviceName = async event => {
        const deviceName = event.target.value
        this.setState({ deviceName })
    }

    handleChangeInputDeviceid = async event => {
        const deviceId = event.target.validity.valid
            ? event.target.value
            : this.state.deviceId

        this.setState({ deviceId })
    }

    handleChangeInputLocation1 = async event => {
        const location1 = event.target.value
        this.setState({ location1 })
    }

    handleChangeInputLocation2 = async event => {
        const location2 = event.target.value
        this.setState({ location2 })
    }

    handleChangeInputStatus = async event => {
        const status = event.target.value
        this.setState({ status })
    }

    handleChangeInputCreateDate = async event => {
        const createdatetime = event.target.value
        this.setState({ createdatetime })
    }

    handleChangeInputUpdateDate = async event => {
        const updatedatetime = event.target.value
        this.setState({ updatedatetime })
    }

    handleIncludeAddDevice = async () => {
        const { deviceName, deviceId, location1, location2, status, createdatetime, updatedatetime } = this.state
        const payload = { deviceName, deviceId, location1, location2, status, createdatetime, updatedatetime }

        await api.insertDevice(payload).then(res => {
            window.alert(`Device created successfully`)
            this.setState({
                deviceName: '',
                deviceId: '',
                location1: '',
                location2: '',
                status: '',
                createdatetime: '',
                updatedatetime: ''
            })
        })
    }

    render() {
        const { deviceName, deviceId, location1, location2, status, createdatetime, updatedatetime } = this.state

        return (
            <Wrapper>
                <Title>Register Device</Title>

                <Label>Device Name: </Label>
                <InputText
                    type="text"
                    value={deviceName}
                    size="50"
                    onChange={this.handleChangeInputDeviceName}
                /><br/>

                <Label>Device ID: </Label>
                <InputText
                    type="number"
                    step="1"
                    lang="en-US"
                    min="10000"
                    max="99999"
                    pattern="[10000-99999]+([,\.][0-9]+)?"
                    value={deviceId}
                    size="10"
                    onChange={this.handleChangeInputDeviceid}
                /><br/>

                <Label>Address 1: </Label>
                <InputText
                    type="text"
                    value={location1}
                    size="50"
                    onChange={this.handleChangeInputLocation1}
                /><br/>

                <Label>Address 2: </Label>
                <InputText
                    type="text"
                    value={location2}
                    size="50"
                    onChange={this.handleChangeInputLocation2}
                /><br/>

                <Label>Device Status: </Label>
                <InputText
                    type="text"
                    value={status}
                    size="15"
                    onChange={this.handleChangeInputStatus}
                /><br/>

                <Button onClick={this.handleIncludeAddDevice}>Add Device</Button>
                <CancelButton href={'/devices'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default AddDevice
