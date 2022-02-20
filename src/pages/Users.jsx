import React, {Component} from 'react'
import api from '../api'

import "./Users.css";
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
    deleteUser = async () => {
        //event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the User ${this.props.id} permanently?`,
            )
        ) {
            await api.deleteUserById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            users: [],
            loading: true
        }
    }

    getAllUsers = async () => {
        try {
            const res = await api.getAllUsers();
            console.log('TEST', res);

            this.setState({loading:false, users: res.data.data})
        } catch (e) {
            console.error('TEST ERROR:', e);
        }
    };

    componentDidMount = async () => {
        await this.getAllUsers()
    }



    render() {
        const columns = [
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
                Header: 'VIEW',
                accessor: 'view',
                Cell: function(props) {
                    return (
                        <ViewUser id={props.original._id} />

                    )
                },
            },
            {
                Header: 'UPDATE',
                accessor: 'update',
                Cell: function(props) {
                    return (
                        <UpdateUser id={props.original._id} />
                    )
                },
            },
            {
                Header: 'DELETE',
                accessor: 'delete',
                Cell: function(props) {
                    return (
                        <DeleteUser id={props.original._id} />
                    )
                },
            },
        ]

        return (
            <div className="App">
                <br/>  Users Table
                <ReactTable
                    data={this.state.users}
                    columns={columns}
                    defaultPageSize={5}
                    showPageSizeOptions={true}
                    minRows={0}
                />

            </div>

        );
    }
}

export default Users
