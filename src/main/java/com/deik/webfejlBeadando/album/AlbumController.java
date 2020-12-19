package com.deik.webfejlBeadando.album;

import com.deik.webfejlBeadando.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth/music")
public class AlbumController {

    @Autowired
    private AlbumRepository albumRepository;

    @GetMapping("/albums")
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    @PostMapping("/albums")
    public Album createAlbum(@RequestBody Album album) {
        return albumRepository.save(album);
    }

    @GetMapping("/albums/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable String id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Album doesn't exist with ID: " + id));
        return ResponseEntity.ok(album);
    }

    @PutMapping("/albums/{id}")
    public ResponseEntity<Album> updateAlbum(@PathVariable String id, @RequestBody Album albumDetails) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Album doesn't exist with ID: " + id));

        album.setTitle(albumDetails.getTitle());
        album.setArtist(albumDetails.getArtist());
        album.setRelease(albumDetails.getRelease());

        Album updatedAlbum = albumRepository.save(album);
        return ResponseEntity.ok(updatedAlbum);
    }

    @DeleteMapping("/albums/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAlbum(@PathVariable String id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Album doesn't exist with ID: " + id));
        albumRepository.delete(album);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
