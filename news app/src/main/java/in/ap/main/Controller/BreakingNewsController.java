package in.ap.main.Controller;

import in.ap.main.Service.BreakingNewsService;
import in.ap.main.entity.BreakingNews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/breaking")
public class BreakingNewsController {

	@Autowired
	private BreakingNewsService service;

	// ADD News
	@PostMapping("/add")
	public BreakingNews add(@RequestBody BreakingNews news) {
		return service.saveNews(news);
	}

	// GET All Breaking News
	@GetMapping("/all")
	public List<BreakingNews> getAll() {
		return service.getAll();
	}

	// UPDATE
	@PutMapping("/update/{id}")
	public ResponseEntity<BreakingNews> update(@PathVariable String id, @RequestBody BreakingNews details) {
		return service.getById(id).map(existing -> {
			existing.setHeading(details.getHeading());
			existing.setCaption(details.getCaption());
			existing.setType(details.getType());
			existing.setMediaUrl(details.getMediaUrl());
			existing.setImageUrl(details.getImageUrl());
			existing.setTime(details.getTime());
			existing.setRegion(details.getRegion());
			return ResponseEntity.ok(service.saveNews(existing));
		}).orElse(ResponseEntity.notFound().build());
	}

	// DELETE
	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return "Breaking news deleted!";
	}
}