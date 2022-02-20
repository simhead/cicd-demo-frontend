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

class UserInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'testuser-10',
            rating: '10',
            faceid: '12345'
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

    handleIncludeAddUser = async () => {
        const { name, faceid, rating } = this.state
        //const arrayTime = time.split('/')
        const payload = { name, faceid, rating }

        await api.insertUser(payload).then(res => {
            window.alert(`User created successfully`)
            this.setState({
                name: '',
                faceid: '',
                rating: ''
            })
        })
    }

    render() {
        const { name, faceid, rating } = this.state

        return (
            <Wrapper>
                <Title>Register User</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    size="50"
                    onChange={this.handleChangeInputName}
                /><br/>

                <Label>Faceid: </Label>
                <InputText
                    type="number"
                    value={faceid}
                    size="10"
                    onChange={this.handleChangeInputFaceid}
                /><br/>

                <Label>Rating: </Label>
                <InputText
                    type="number"
                    value={rating}
                    size="5"
                    onChange={this.handleChangeInputRating}
                /><br/>

                <Button onClick={this.handleIncludeAddUser}>Add User</Button>
                <CancelButton href={'/users'}>List Users</CancelButton>
            </Wrapper>
        )
    }
}

export default UserInsert
