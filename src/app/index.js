import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Using without dropdown
//import { NavBar } from '../components'
//import { Home, UserView, UserInsert, UserUpdate, ToolClock, Users, Devices } from '../pages'

// Using with dropdown
import { NavBar } from '../v2-dropdown/components'
import { Home, UserView, UserInsert, UserUpdate, ToolClock, Users, Devices, DeviceView } from '../pages'
import { AddUser, AddActivity, AddDevice, LoginPage } from '../v2-dropdown/pages'

import { FooterContainer } from '../containers/footer'
//import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
    return (
        <div className={"App"}>
            <Router>
            <NavBar fixed="fixed" />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path="/users" exact component={Users} />
                <Route path="/adduser" exact component={AddUser} />
                <Route path="/addactivity" exact component={AddActivity} />
                <Route path="/adddevice" exact component={AddDevice} />
                <Route path='/devices' component={Devices} />
                <Route path='/login' component={LoginPage} />
                <Route path="/user/create" exact component={UserInsert} />
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
                <Route
                    path="/device/view/:id"
                    exact
                    component={DeviceView}
                />

            </Switch>
            </Router>
            <FooterContainer />
        </div>
    );
}

export default App
