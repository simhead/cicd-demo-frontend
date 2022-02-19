import React, { Component } from 'react'
import api from '../api'

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

class UserUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            rating: '',
            time: '',
            faceid: '',
            mobile: '',
            address: ''
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

    handleChangeInputMobile = async event => {
        const mobile = event.target.value
        this.setState({ mobile })
    }

    handleChangeInputAddress = async event => {
        const address = event.target.value
        this.setState({ address })
    }

    handleUpdateUser = async () => {
        const { id, name, rating, time, faceid, mobile, address } = this.state
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime, faceid, mobile, address }

        await api.updateUserById(id, payload).then(res => {
            window.alert(`User updated successfully`)
            this.setState({
                name: '',
                rating: '',
                time: '',
                faceid: '',
                mobile: '',
                address: ''
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const user = await api.getUserById(id)

        this.setState({
            name: user.data.data.name,
            rating: user.data.data.rating,
            time: user.data.data.time.join('/'),
            faceid: user.data.data.faceid,
            mobile: user.data.data.mobile,
            address: user.data.data.address,
        })
    }

    render() {
        const { name, rating, time, faceid, mobile, address } = this.state
        return (
            <Wrapper>
                <Title>Update User</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                /><br/>

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

                <Label>Mobile Number: </Label>
                <InputText
                    type="text"
                    value={mobile}
                    size="15"
                    onChange={this.handleChangeInputMobile}
                /><br/>

                <Label>Address: </Label>
                <InputText
                    type="text"
                    value={address}
                    size="50"
                    onChange={this.handleChangeInputAddress}
                /><br/>
                <Button onClick={this.handleUpdateUser}>Update User</Button>
                <CancelButton href={'/users'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default UserUpdate
