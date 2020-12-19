package com.deik.webfejlBeadando.song;

import com.deik.webfejlBeadando.album.Album;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "song", schema = "music")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "album_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("album_id")
    private Album album_id;

    @Column(name = "title")
    private String title;

    @Column(name = "trackNum")
    private int trackNum;

    public Song() {}

    public Song(String id, Album album_id, String title, int trackNum) {
        this.id = id;
        this.album_id = album_id;
        this.title = title;
        this.trackNum = trackNum;
    }

    public String getId() {
        return id;
    }

    void setId(String id) {
        this.id = id;
    }

    public Album getAlbum_id() {
        return album_id;
    }

    void setAlbum_id(Album album_id) {
        this.album_id = album_id;
    }

    public String getTitle() {
        return title;
    }

    void setTitle(String title) {
        this.title = title;
    }

    public int getTrackNum() {
        return trackNum;
    }

    void setTrackNum(int trackNum) {
        this.trackNum = trackNum;
    }

    @Override
    public String toString() {
        return "Song{" +
                "id='" + id + '\'' +
                ", album_id=" + album_id + '\'' +
                ", title=" + title + '\'' +
                ", track_num=" + trackNum +
                '}';
    }
}
