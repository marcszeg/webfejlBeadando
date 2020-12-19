import React, {Component} from 'react';
import './App.css';
import {Switch, Route, Link} from 'react-router-dom'
import AuthService from './services/AuthService.js';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import HomeComponent from './components/HomeComponent';
import ProfileComponent from './components/ProfileComponent';
import AAlbumComponent from './components/AAlbumComponent';
import AlbumComponent from './components/AlbumComponent';
import AlbumDetailComponent from './components/AlbumDetailComponent';
import ASongComponent from './components/ASongComponent';
import CreateAlbumComponent from './components/CreateAlbumComponent';
import CreateSongComponent from './components/CreateSongComponent';

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const {currentUser, showAdminBoard} = this.state;

    return (
      <div>
        <style>{'body { background-color: #F4F7F9; }'}</style>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Webapp
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to ={"/albums"} className="nav-link">
                  Albums
                </Link>
              </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/albums-admin"} className="nav-link">
                    Albums (Admin)
                  </Link>
                </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/songs-admin"} className="nav-link">
                  Songs (Admin)
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Log in
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={HomeComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/register" component={RegisterComponent} />
            <Route exact path="/profile" component={ProfileComponent} />
            <Route path="/add-album/:id" component={CreateAlbumComponent}></Route>
            <Route path="/add-song/:id" component={CreateSongComponent}></Route>
            <Route path="/view-album/:id" component={AlbumDetailComponent}></Route>
            <Route path="/albums" component={AlbumComponent} />
            <Route path="/albums-admin" component={AAlbumComponent}/>
            <Route path="/songs-admin" component={ASongComponent}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
