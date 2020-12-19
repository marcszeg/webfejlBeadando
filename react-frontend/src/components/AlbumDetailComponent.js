import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import MusicService from '../services/MusicService';
import AuthService from '../services/AuthService';
import './Style.css';

class AlbumDetailComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            album: {},
            songs: []
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"});
        this.setState({currentUser: currentUser, userReady: true})

        MusicService.getAlbumById(this.state.id).then(res => {
            this.setState({album: res.data});
        })
        /*MusicService.getSongsByAlbumId(this.state.id).then((res) => {
            this.setState({songs: res.data});
        })*/
    }

    return() {
        this.props.history.push('/albums');
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

        /*songs.sort((a, b) => {
            const isReversed = (this.state.sortToggle === true) ? 1 : -1;
            //return (isReversed * a.trackNum.localeCompare(b.trackNum));
            return (isReversed * a.title.localeCompare(b.title));
        });*/

        return (
            <div>
                <div className="card col-md-10 offset-md-1">
                    <div>
                        <div> {this.state.album.title} </div>
                    </div>
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{width:"20%"}}>track number</th>
                                    <th>title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="9">No songs</td>
                                    </tr>:
                                    songs.map(
                                        song =>
                                            <tr key = {songs.id}>
                                                <td>{song.trackNum}</td>
                                                <td>{song.title}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default AlbumDetailComponent;