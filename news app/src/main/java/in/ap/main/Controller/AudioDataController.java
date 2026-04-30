package in.ap.main.Controller;

import in.ap.main.Service.AudioDataService;
import in.ap.main.entity.AudioData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/audio-podcast")
@CrossOrigin(originPatterns = "*")
public class AudioDataController {

	@Autowired
	private AudioDataService service;

	@GetMapping("/layout")
	public Map<String, Object> getLayout() {
		return service.getAudioLayout();
	}

	@PostMapping("/add")
	public AudioData add(@RequestBody AudioData data) {
		return service.save(data);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<AudioData> update(@PathVariable String id, @RequestBody AudioData newData) {
		return service.getById(id).map(existing -> {
			existing.setBaseTitle(newData.getBaseTitle());
			existing.setDate(newData.getDate());
			existing.setTime(newData.getTime());
			existing.setReadTime(newData.getReadTime());
			existing.setSection(newData.getSection());
			existing.setImageUrl(newData.getImageUrl());
			existing.setCategoryName(newData.getCategoryName());
			existing.setCount(newData.getCount());
			existing.setPopularTags(newData.getPopularTags());
			existing.setAudioListData(newData.getAudioListData()); // JSON update
			return ResponseEntity.ok(service.save(existing));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return "Podcast data deleted";
	}
}