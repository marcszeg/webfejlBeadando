import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import AuthService from '../services/AuthService';
import MusicService from "../services/MusicService";

class CreateAlbumComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            redirect: null,
            userReady: false,
            user: undefined,
            title: '',
            artist: '',
            release: ''
            //album_id: '',
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeArtistHandler = this.changeArtistHandler.bind(this);
        this.changeReleaseHandler = this.changeReleaseHandler.bind(this);
        this.saveOrUpdateAlbum = this.saveOrUpdateAlbum.bind(this);
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (!user) this.setState({redirect: "/home"});
        if (user) {
            if (!user.roles.includes("ROLE_ADMIN")) this.setState({redirect: "/home"});
            this.setState({user: user, userReady: true, isAdmin: true})
        }

        if(this.state.id === '_add') {
            return
        } else {
            MusicService.getAlbumById(this.state.id).then( (res) => {
                let album = res.data;
                this.setState({title: album.title,
                    artist: album.artist,
                    release: album.release/*,
                    album_id: album.album_id*/
                });
            });
        }
    }

    saveOrUpdateAlbum = (t) => {
        t.preventDefault();
        let album = {title: this.state.title, artist: this.state.artist, release: this.state.release};
        console.log('album => ' + JSON.stringify(album));

        if(this.state.id === '_add') {
            MusicService.createAlbum(album).then(res => {
                this.props.history.push('/albums-admin');
            });
        } else {
            MusicService.updateAlbum(album, this.state.id).then(res => {
                this.props.history.push('/albums-admin');
            })
        }
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeArtistHandler = (event) => {
        this.setState({artist: event.target.value});
    }

    changeReleaseHandler = (event) => {
        this.setState({release: event.target.value});
    }

    cancel() {
        this.props.history.push('/albums-admin');
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            Add/update album
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>title:</label>
                                        <input name="title" className="form-control"
                                               value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>artist:</label>
                                        <input name="artist" className="form-control"
                                               value={this.state.artist} onChange={this.changeArtistHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>release:</label>
                                        <input name="release" className="form-control"
                                               value={this.state.release} onChange={this.changeReleaseHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateAlbum}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateAlbumComponent;