package com.deik.webfejlBeadando.song;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Qualifier("datasource2")
@Repository
public interface SongRepository extends JpaRepository<Song, String> {
    Set<Song> findByAlbumId(String album_id);
}
