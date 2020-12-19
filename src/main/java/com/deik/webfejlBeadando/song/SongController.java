package com.deik.webfejlBeadando.song;

import com.deik.webfejlBeadando.album.Album;
import com.deik.webfejlBeadando.album.AlbumRepository;
import com.deik.webfejlBeadando.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth/music")
public class SongController {

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @GetMapping("/songs")
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    /*@GetMapping("/song/{albumId}")
    public List<Song> getSongsByAlbum(@PathVariable Album albumId) {
        return songRepository.findByAlbumId(albumId);
    }*/

    @PostMapping("/songs")
    public Song createSong(@RequestBody Song song) {
        return songRepository.save(song);
    }

    @GetMapping("/songs/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable String id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song doesn't exist with ID: " + id));
        return ResponseEntity.ok(song);
    }

    @PutMapping("/songs/{id}")
    public ResponseEntity<Song> updateSong(@PathVariable String id, @RequestBody Song songDetails) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song doesn't exist with ID: " + id));

        song.setAlbum_id(songDetails.getAlbum_id());
        song.setTitle(songDetails.getTitle());
        song.setTrackNum(songDetails.getTrackNum());

        Song updatedSong = songRepository.save(song);
        return ResponseEntity.ok(updatedSong);
    }

    @DeleteMapping("/songs/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSong(@PathVariable String id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song doesn't exist with ID: " + id));
        songRepository.delete(song);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
