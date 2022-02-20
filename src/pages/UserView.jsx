import React, { Component } from 'react'

import api from '../api'

import styled from 'styled-components'

const Title = styled.h4.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 10px;
`

const Label = styled.label`
    margin: 5px;
`

const Text = styled.label`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 10px 10px 10px 5px;
`

class UserView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            faceid: '',
            rating: '',
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
                rating: userById.data.data.rating,
                isLoading: false,
            })
        })

    }

    render() {
        const { name, faceid, rating } = this.state

        return (
            <Wrapper>
                <Title>User Details</Title>

                <Label>Name: </Label>
                <Text>{name}</Text><br/>

                <Label>Faceid: </Label>
                <Text>{faceid}</Text><br/>

                <Label>Rating: </Label>
                <Text>{rating}</Text><br/>

                <Button onClick={event =>  window.location.href='/users'}>User List</Button>

            </Wrapper>
        )
    }
}

export default UserView
