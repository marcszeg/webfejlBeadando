package com.deik.webfejlBeadando.album;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Qualifier("datasource2")
@Repository
public interface AlbumRepository extends JpaRepository<Album, String> {
    public Album findByTitle(String title);
}
