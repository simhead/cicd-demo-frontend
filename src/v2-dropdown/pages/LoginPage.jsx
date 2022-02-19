import React from 'react';
import { Link } from 'react-router-dom';
import '../../app/App.css';
import {LoginButton} from "../components/LoginButton";
import {SignupButton} from "../components/SignupButton";
//import { connect } from 'react-redux';

//import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (

            <h1 className='log-in'>
                <LoginButton /> &nbsp;
                <SignupButton />
            </h1>



        );
    }
}
/*
function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};
*/


//const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export default LoginPage;