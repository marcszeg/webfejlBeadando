import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import MusicService from '../services/MusicService';
import AuthService from '../services/AuthService';
import './Style.css';

class AAlbumComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            user: undefined,
            albums: [],
            sortToggle: true
        }
        this.addAlbum = this.addAlbum.bind(this);
        this.editAlbum = this.editAlbum.bind(this);
        this.deleteAlbum = this.deleteAlbum.bind(this);
    }

    addAlbum() {
        this.props.history.push(`/add-album/_add`);
    }

    editAlbum(id) {
        this.props.history.push(`/add-album/${id}`);
    }

    deleteAlbum(id) {
        MusicService.deleteAlbum(id).then(res => {
            this.setState({albums: this.state.albums.filter(album => album.id !== id)});
        });
    }

    viewAlbum(id) {
        this.props.history.push(`/view-album/${id}`);
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (!user) this.setState({redirect: "/home"});
        if (user) {
            if (!user.roles.includes("ROLE_ADMIN")) this.setState({redirect: "/home"});
            this.setState({user: user, userReady: true, isAdmin: true})
        }

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

        const {albums} = this.state;

        albums.sort((a, b) => {
            const isReversed = (this.state.sortToggle === true) ? 1 : -1;
            return (isReversed * a.id.localeCompare(b.id));
        });

        return (
            <div>
                <h2 className="text-center">Albums</h2>
                <div style={{"float": "left"}} className="row">
                    <button className="btn btn-info" onClick={this.addAlbum}>Add album</button>
                </div>
                <br></br>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th onClick={this.sortData}>ID<div className={this.state.sortToggle ? "arrow arrow-up" : "arrow arrow-down"}></div></th>
                                <th>title</th>
                                <th>artist</th>
                                <th>release date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {albums.length === 0 ?
                                <tr align="center">
                                    <td colSpan="9">No albums</td>
                                </tr>:
                                albums.map(
                                    album =>
                                        <tr key = {album.id}>
                                            <td className="align-middle" width="5%">{album.id}</td>
                                            <td className="align-middle" width="25%">{album.title}</td>
                                            <td className="align-middle" width="20%">{album.artist}</td>
                                            <td className="align-middle" width="15%">{album.release}</td>
                                            <td className="align-middle">
                                                <button onClick={ () => this.editAlbum(album.id)} className="btn btn-info">update</button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAlbum(album.id)} className="btn btn-info">delete</button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.viewAlbum(album.id)} className="btn btn-info">detail</button>
                                            </td>
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

export default AAlbumComponent;