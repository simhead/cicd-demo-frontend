import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    SoyNet Frontend Application
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/user/list" className="nav-link">
                                List Users
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/user/create" className="nav-link">
                                Register User
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/tool/clock" className="nav-link">
                                Get Clock
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
