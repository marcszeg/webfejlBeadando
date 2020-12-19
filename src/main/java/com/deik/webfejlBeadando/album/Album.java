package com.deik.webfejlBeadando.album;

import com.deik.webfejlBeadando.song.Song;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "album", schema="music")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "title")
    private String title;

    @Column(name = "artist")
    private String artist;

    @Column(name = "release")
    private int release;

    @OneToMany(mappedBy = "album_id", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Song> album;

    public Album() {}

    public Album(String id, String title, String artist, int release) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.release = release;
    }

    public String getId() {
        return id;
    }

    void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    void setArtist(String artist) {
        this.artist = artist;
    }

    public int getRelease() {
        return release;
    }

    void setRelease(int release) {
        this.release = release;
    }

    public String toString() {
        return "Album{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", artist='" + artist + '\'' +
                ", release='" + release +
                '}';
    }
}
