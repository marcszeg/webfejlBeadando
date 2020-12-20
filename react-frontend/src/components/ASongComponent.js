import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import MusicService from '../services/MusicService';
import AuthService from '../services/AuthService';
import './Style.css';

class ASongComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: null,
            userReady: false,
            user: undefined,
            songs: [],
            sortToggle: true
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (!user) this.setState({redirect: "/home"});
        if (user) {
            if (!user.roles.includes("ROLE_ADMIN")) this.setState({redirect: "/home"});
            this.setState({user: user, userReady: true, isAdmin: true})
        }

        MusicService.getSongs().then((res) => {
            this.setState({songs: res.data});
        });
    }

    sortData = () => {
        this.setState(state => ({
            sortToggle: !state.sortToggle
        }));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {songs} = this.state;

        songs.sort((a, b) => {
            const isReversed = (this.state.sortToggle === true) ? 1 : -1;
            return (isReversed * a.id.localeCompare(b.id));
        });

        return (
            <div>
                <h2 className="text-center">Songs (admin page)</h2>
                <br></br>
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th onClick={this.sortData}>ID<div className={this.state.sortToggle ? "arrow arrow-up" : "arrow arrow-down"}></div></th>
                                <th>album ID</th>
                                <th>track number</th>
                                <th>title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.length === 0 ?
                                <tr align="center">
                                    <td colSpan="9">No albums</td>
                                </tr>:
                                songs.map(
                                    song =>
                                        <tr key = {song.id}>
                                            <td className="align-middle" width="5%">{song.id}</td>
                                            <td className="align-middle" width="10%">{song.album_id}</td>
                                            <td className="align-middle" width="15%">{song.trackNum}</td>
                                            <td className="align-middle" width="30%">{song.title}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default ASongComponent;