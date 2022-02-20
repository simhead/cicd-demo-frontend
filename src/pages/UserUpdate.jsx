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
            faceid: '',
            rating: ''
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputFaceid = async event => {
        const faceid = event.target.value
        this.setState({ faceid })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.value
        this.setState({ rating })
    }

    handleUpdateUser = async () => {
        const { id, name, faceid, rating } = this.state
        const payload = { name, faceid, rating }

        console.log('id: '+id+'')
        console.log(payload)
        await api.updateUserById(id, payload).then(res => {
            window.alert(`User updated successfully`)
            this.setState({
                name: name,
                faceid: faceid,
                rating: rating,
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const user = await api.getUserById(id)

        this.setState({
            name: user.data.data.name,
            faceid: user.data.data.faceid,
            rating: user.data.data.rating,

        })
    }

    render() {
        const { name, faceid, rating } = this.state
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
                    type="text"
                    value={faceid}
                    onChange={this.handleChangeInputFaceid}
                /><br/>

                <Label>Rating: </Label>
                <InputText
                    type="text"
                    value={rating}
                    onChange={this.handleChangeInputRating}
                /><br/>

                <Button onClick={this.handleUpdateUser}>Update User</Button>
                <CancelButton href={'/users'}>List Users</CancelButton>
            </Wrapper>
        )
    }
}

export default UserUpdate
