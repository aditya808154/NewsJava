package in.ap.main.Controller;

import in.ap.main.Service.HealthDataService;
import in.ap.main.entity.HealthData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/health-news")
@CrossOrigin(originPatterns = "*")
public class HealthDataController {

	@Autowired
	private HealthDataService service;

	// Frontend Layout Fetch
	@GetMapping("/layout")
	public ResponseEntity<Map<String, Object>> getLayout() {
		return ResponseEntity.ok(service.getHealthFullLayout());
	}

	// CREATE / ADD
	@PostMapping("/add")
	public HealthData add(@RequestBody HealthData data) {
		return service.save(data);
	}

	// UPDATE
	@PutMapping("/update/{id}")
	public ResponseEntity<HealthData> update(@PathVariable String id, @RequestBody HealthData newData) {
		return service.getById(id).map(item -> {
			item.setTitle(newData.getTitle());
			item.setSummary(newData.getSummary());
			item.setCategory(newData.getCategory());
			item.setImageUrl(newData.getImageUrl());
			item.setSection(newData.getSection());
			item.setTime(newData.getTime());
			item.setDate(newData.getDate());
			return ResponseEntity.ok(service.save(item));
		}).orElse(ResponseEntity.notFound().build());
	}

	// DELETE
	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return "Health news item deleted: " + id;
	}
}