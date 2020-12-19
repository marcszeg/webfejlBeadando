import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import {Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStepBackward, faFastBackward, faStepForward, faFastForward, faTimes} from '@fortawesome/free-solid-svg-icons';
import AuthService from "../services/AuthService";
import './Style.css';
import MusicService from "../services/MusicService";

class AlbumComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            albums: [],
            sortToggle: true
        }
    }

    viewAlbum(id) {
        this.props.history.push(`/view-album/${id}`)
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({redirect: "/home"});
        this.setState({currentUser: currentUser, userReady: true})

        MusicService.getAlbums().then((res) => {
            this.setState({albums: res.data});
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

        const {albums} = this.state

        albums.sort((a, b) => {
            const isReversed = (this.state.sortToggle === true) ? 1 : -1;
            return (isReversed * a.title.localeCompare(b.title));
        });

        return (
            <div>
                <h2 className="text-center">Albums</h2>
                <br></br>
                <div className="row" style={{width:"800px", marginLeft:"150px"}}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th onClick={this.sortData} style={{width:"300px"}}>Title<div className={this.state.sortToggle ? "arrow arrow-up" : "arrow arrow-down"}></div></th>
                                <th>Artist</th>
                                <th>Release date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {albums.length === 0 ?
                                <tr align="center">
                                    <td colSpan="3">No albums</td>
                                </tr>:
                                albums.map(
                                    album =>
                                        <tr key = {album.id}>
                                            <td style={{fontSize:"18px"}}>{album.title}</td>
                                            <td style={{fontSize:"18px"}}>{album.artist}</td>
                                            <td style={{fontSize:"18px"}}>{album.release}</td>
                                            <td>
                                                <button onClick={ () => this.viewAlbum(album.id)} className="btn btn-info">details</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AlbumComponent;