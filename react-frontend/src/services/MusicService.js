import axios from 'axios';

const ALBUM_API_BASE_URL = "http://localhost:8080/api/auth/music/albums";
const SONG_API_BASE_URL = "http://localhost:8080/api/auth/music/songs";

class MusicService {
    getAlbums() {
        return axios.get(ALBUM_API_BASE_URL)
    }

    createAlbum(album) {
        return axios.post(ALBUM_API_BASE_URL, album)
    }

    getAlbumById(albumId) {
        return axios.get(ALBUM_API_BASE_URL + '/' + albumId);
    }

    updateAlbum(album, albumId) {
        return axios.put(ALBUM_API_BASE_URL + '/' + albumId, album);
    }

    deleteAlbum(albumId) {
        return axios.delete(ALBUM_API_BASE_URL + '/' + albumId);
    }


    getSongs() {
        return axios.get(SONG_API_BASE_URL)
    }

    /*getSongsByAlbumId(albumId) {
        return axios.get(SONG_API_BASE_URL + '/' + albumId);
    }
*/
    createSong(song) {
        return axios.post(SONG_API_BASE_URL, song)
    }

    getSongById(songId) {
        return axios.get(SONG_API_BASE_URL + '/' + songId);
    }

    updateSong(song, songId) {
        return axios.put(SONG_API_BASE_URL + '/' + songId, song);
    }

    deleteSong(songId) {
        return axios.delete(SONG_API_BASE_URL + '/' + songId);
    }
}

export default new MusicService()