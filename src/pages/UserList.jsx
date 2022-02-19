import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'
import 'UserList.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

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


class UpdateUser extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/user/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class ViewUser extends Component {
    viewUser = event => {
        event.preventDefault()

        window.location.href = `/user/view/${this.props.id}`
    }

    render() {
        return <View onClick={this.viewUser}>View</View>
    }
}

class DeleteUser extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the User ${this.props.id} permanently?`,
            )
        ) {
            api.deleteUserById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllUsers().then(users => {
            this.setState({
                users: users.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { users, isLoading } = this.state
        console.log('TCL: UserList -> render -> users', users)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'FaceID',
                accessor: 'faceid',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <ViewUser id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateUser id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteUser id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!users.length) {
            showTable = false
        }

        return (
            <>
                {showTable && (
                    <ReactTable className='visibility'
                        data={users}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </>
        )
    }
}

export default UserList
