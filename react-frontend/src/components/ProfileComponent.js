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
                    <header>
                        <h3>
                            {currentUser.username}
                        </h3>
                    </header>

                    <p>
                        First Name:{" "}
                        {currentUser.firstName}
                    </p>
                    <p>
                        Last Name:{" "}
                        {currentUser.lastName}
                    </p>
                    <p>
                        E-Mail:{" "}
                        {currentUser.email}
                    </p>
                    <p>
                        Role:
                        <ul>
                            {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                    </p>
                    <p>
                        ID:{" "}
                        {currentUser.id}
                    </p>
                </div>: null}
                </div>
            );
        }
    }