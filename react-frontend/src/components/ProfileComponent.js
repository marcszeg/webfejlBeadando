import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../services/AuthService.js";

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""}
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"});
        this.setState({currentUser: currentUser, userReady: true})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {currentUser} = this.state;

        return (
            <div className="container">
                {(this.state.userReady) ?
                <div>
                    <header className="jumbotron">
                        <h3>
                            <strong>{currentUser.username}</strong> Profile
                        </h3>
                    </header>
                    <p style={{marginLeft:"40px"}}>
                        <strong>Token:</strong>{" "}
                        {currentUser.accessToken.substring(0, 20)} ...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </p>
                    <p style={{marginLeft:"40px"}}>
                        <strong>ID:</strong>{" "}
                        {currentUser.id}
                    </p>
                    <p style={{marginLeft:"40px"}}>
                        <strong>First Name:</strong>{" "}
                        {currentUser.firstName}
                    </p>
                    <p style={{marginLeft:"40px"}}>
                        <strong>Last Name:</strong>{" "}
                        {currentUser.lastName}
                    </p>
                    <p style={{marginLeft:"40px"}}>
                        <strong>E-Mail:</strong>{" "}
                        {currentUser.email}
                    </p>
                    <strong style={{marginLeft:"40px"}}>Authorities:</strong>
                    <ul style={{marginLeft:"40px"}}>
                        {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                </div>: null}
                </div>
            );
        }
    }