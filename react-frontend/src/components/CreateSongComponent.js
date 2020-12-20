import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import AuthService from '../services/AuthService';
import MusicService from "../services/MusicService";

class CreateSongComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            redirect: null,
            userReady: false,
            user: undefined,
            title: '',
            trackNum: '',
            album_id: '',
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeTrackNumHandler = this.changeTrackNumHandler.bind(this);
        this.changeAlbumIdHandler = this.changeAlbumIdHandler.bind(this);
        this.saveOrUpdateSong = this.saveOrUpdateSong.bind(this);
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
            MusicService.getSongById(this.state.id).then( (res) => {
                let song = res.data;
                this.setState({title: song.title,
                    trackNum: song.trackNum,
                    album_id: song.album_id
                });
            });
        }
    }

    saveOrUpdateSong = (t) => {
        t.preventDefault();
        let song = {title: this.state.title, trackNum: this.state.trackNum, album_id: this.state.album_id};
        console.log('song => ' + JSON.stringify(song));

        if(this.state.id === '_add') {
            MusicService.createSong(song).then(res => {
                this.props.history.push('/songs-admin');
            });
        } else {
            MusicService.updateSong(song, this.state.id).then(res => {
                this.props.history.push('/songs-admin');
            })
        }
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeTrackNumHandler = (event) => {
        this.setState({trackNum: event.target.value});
    }

    changeAlbumIdHandler = (event) => {
        this.setState({album_id: event.target.value});
    }

    cancel() {
        this.props.history.push('/songs-admin');
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
                            Add/update song
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>title:</label>
                                        <input name="title" className="form-control"
                                               value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>track number:</label>
                                        <input name="trackNum" className="form-control"
                                               value={this.state.trackNum} onChange={this.changeTrackNumHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>album ID:</label>
                                        <input name="album_id" className="form-control"
                                               value={this.state.album_id} onChange={this.changeAlbumIdHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateSong}>Save</button>
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

export default CreateSongComponent;