package in.ap.main.Controller;

import in.ap.main.Service.VideoService;
import in.ap.main.entity.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

	@Autowired
	private VideoService service;

	// POST: Add new Video Entry
	@PostMapping("/add")
	public Video create(@RequestBody Video video) {
		return service.saveVideo(video);
	}

	// GET: All Videos for React Frontend (Key: videoData)
	@GetMapping("/popular")
	public Map<String, List<Video>> getAll() {
		Map<String, List<Video>> response = new HashMap<>();
		response.put("videoData", service.getAllVideos());
		return response;
	}

	// PUT: Update Video News
	@PutMapping("/update/{id}")
	public ResponseEntity<Video> update(@PathVariable String id, @RequestBody Video details) {
		return service.getById(id).map(existing -> {
			existing.setTitle(details.getTitle());
			existing.setCategory(details.getCategory());
			existing.setDate(details.getDate());
			existing.setComments(details.getComments());
			existing.setThumbnail(details.getThumbnail());
			existing.setVideoUrl(details.getVideoUrl());
			existing.setDescription(details.getDescription());
			return ResponseEntity.ok(service.saveVideo(existing));
		}).orElse(ResponseEntity.notFound().build());
	}

	// DELETE: Remove Video
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable String id) {
		service.deleteVideo(id);
		return ResponseEntity.ok("Video News deleted successfully.");
	}
}