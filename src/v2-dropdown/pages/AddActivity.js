import React, { Component } from 'react'
import api from '../../api/activity'

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

class AddActivity extends Component {
    constructor(props) {
        super(props)

        const datetime = new Date();
        this.state = {
            faceid: '100001',
            name: 'Test User 1',
            datetime: datetime.toISOString(),
            deviceid: '10001',
            feature: '1.23,3.23',
            visitcnt: '',
            stayhour: '',
            temperature: '37',
            coughcnt: '',
            maskflag: 'false',

        }

    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputFaceid = async event => {
        const faceid = event.target.validity.valid
            ? event.target.value
            : this.state.faceid

        this.setState({ faceid })
    }

    handleChangeInputCreateDatetime = async event => {
        const datetime = event.target.value
        this.setState({ datetime })
    }

    handleChangeInputDeviceid = async event => {
        const deviceid = event.target.validity.valid
            ? event.target.value
            : this.state.deviceid

        this.setState({ deviceid })
    }

    handleChangeInputFeature = async event => {
        const feature = event.target.value
        this.setState({ feature })
    }

    handleChangeInputVisiticnt = async event => {
        const visitcnt = event.target.value
        this.setState({ visitcnt })
    }

    handleChangeInputStayhour = async event => {
        const stayhour = event.target.value
        this.setState({ stayhour })
    }

    handleChangeInputTemperature = async event => {
        const temperature = event.target.value
        this.setState({ temperature })
    }

    handleChangeInputCoughcnt = async event => {
        const coughcnt = event.target.value
        this.setState({ coughcnt })
    }

    handleChangeInputMaskflag = async event => {
        const maskflag = event.target.value
        this.setState({ maskflag })
    }

    handleIncludeAddActivity = async () => {
        const { faceid, name, datetime, deviceid, feature, visitcnt, stayhour, temperature, coughcnt, maskflag } = this.state
        const payload = { faceid, name, datetime, deviceid, feature, visitcnt, stayhour, temperature, coughcnt, maskflag  }

        await api.addActivity(payload).then(res => {
            window.alert(`Activity created successfully`)
            this.setState({
                faceid: '',
                name: '',
                datetime: '',
                deviceid: '',
                feature: '',
                visitcnt: '',
                stayhour: '',
                temperature: '',
                coughcnt: '',
                maskflag: '',
            })
        })
    }

    render() {
        const { faceid, name, deviceid, feature, visitcnt, stayhour, temperature, coughcnt, maskflag } = this.state

        return (
            <Wrapper>
                <Title>Add Activity</Title>

                <Label>Faceid: </Label>
                <InputText
                    type="number"
                    step="1"
                    lang="en-US"
                    min="100000"
                    max="999999"
                    pattern="[100000-999999]+([,\.][0-9]+)?"
                    value={faceid}
                    size="10"
                    onChange={this.handleChangeInputFaceid}
                /><br/>

                <Label>Face Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    size="50"
                    onChange={this.handleChangeInputName}
                /><br/>

                <Label>Device ID: </Label>
                <InputText
                    type="number"
                    step="1"
                    lang="en-US"
                    min="10000"
                    max="99999"
                    pattern="[10000-99999]+([,\.][0-9]+)?"
                    value={deviceid}
                    size="10"
                    onChange={this.handleChangeInputDeviceid}
                /><br/>

                <Label>Feature in vector: </Label>
                <InputText
                    type="text"
                    value={feature}
                    size="50"
                    onChange={this.handleChangeInputFeature}
                /><br/>

                <Label>Visit Count: </Label>
                <InputText
                    type="number"
                    value={visitcnt}
                    size="10"
                    onChange={this.handleChangeInputVisiticnt}
                /><br/>

                <Label>Stay Hour: </Label>
                <InputText
                    type="number"
                    value={stayhour}
                    size="10"
                    onChange={this.handleChangeInputStayhour}
                /><br/>

                <Label>Temperature: </Label>
                <InputText
                    type="number"
                    step="0.5"
                    lang="en-US"
                    min="37"
                    max="42"
                    pattern="[20-42]+([,\.][0-9]+)?"
                    value={temperature}
                    size="10"
                    onChange={this.handleChangeInputTemperature}
                /><br/>

                <Label>Cough Count: </Label>
                <InputText
                    type="number"
                    value={coughcnt}
                    size="10"
                    onChange={this.handleChangeInputCoughcnt}
                /><br/>

                <Label>Mask Flag: </Label>
                <InputText
                    type="text"
                    value={maskflag}
                    size="10"
                    onChange={this.handleChangeInputMaskflag}
                /><br/>

                <Button onClick={this.handleIncludeAddActivity}>Add Activity</Button>
                <CancelButton href={'/users'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default AddActivity
