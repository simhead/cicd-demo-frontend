import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Using with dropdown
import { NavBar } from '../v2-dropdown/components'
import { Home, UserView, UserInsert, UserUpdate, ToolClock, Users, StreamDataIO } from '../pages'

import { FooterContainer } from '../containers/footer'
import './App.css';

function App() {
    return (
        <div className={"App"}>
            <Router>
            <NavBar fixed="fixed" />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path="/users" exact component={Users} />
                <Route path="/adduser" exact component={UserInsert} />
                <Route path="/streamdataio" exact component={StreamDataIO} />
                <Route path="/tool/clock" exact component={ToolClock} />
                <Route
                    path="/user/view/:id"
                    exact
                    component={UserView}
                />
                <Route
                    path="/user/update/:id"
                    exact
                    component={UserUpdate}
                />

            </Switch>
            </Router>
            <FooterContainer />
        </div>
    );
}

export default App
