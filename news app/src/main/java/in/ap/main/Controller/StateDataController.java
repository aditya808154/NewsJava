package in.ap.main.Controller;

import in.ap.main.Service.StateDataService;
import in.ap.main.entity.StateData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/state-news")
public class StateDataController {

	@Autowired
	private StateDataService service;

	// READ ALL (Layout ke liye)
	@GetMapping("/layout")
	public ResponseEntity<Map<String, Object>> getLayout() {
		return ResponseEntity.ok(service.getStateFullLayout());
	}

	// CREATE
	@PostMapping("/add")
	public StateData add(@RequestBody StateData data) {
		return service.save(data);
	}

	// UPDATE
	@PutMapping("/update/{id}")
	public ResponseEntity<StateData> update(@PathVariable String id, @RequestBody StateData newData) {
		return service.getById(id).map(item -> {
			item.setTitle(newData.getTitle());
			item.setSummary(newData.getSummary());
			item.setCategory(newData.getCategory());
			item.setImageUrl(newData.getImageUrl());
			item.setSection(newData.getSection());
			item.setDate(newData.getDate());
			item.setTime(newData.getTime());
			item.setAuthor(newData.getAuthor());
			item.setCount(newData.getCount());
			item.setCode(newData.getCode());
			item.setName(newData.getName());
			return ResponseEntity.ok(service.save(item));
		}).orElse(ResponseEntity.notFound().build());
	}

	// DELETE
	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return "State data deleted with id: " + id;
	}
}