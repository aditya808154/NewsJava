package in.ap.main.Controller;

import in.ap.main.Service.CategoryFourService;
import in.ap.main.entity.CategoryFour;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/category-four")
public class CategoryFourController {

	@Autowired
	private CategoryFourService service;

	@PostMapping("/add")
	public CategoryFour add(@RequestBody CategoryFour news) {
		return service.saveNews(news);
	}

	// Ab URL sirf: /api/category-four/layout rahega
	@GetMapping("/layout")
	public Map<String, Object> getLayout() {
		return service.getCategoryFourLayout();
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<CategoryFour> update(@PathVariable String id, @RequestBody CategoryFour details) {
		return service.getById(id).map(existing -> {
			existing.setSection(details.getSection());
			existing.setCategory(details.getCategory());
			existing.setTitle(details.getTitle());
			existing.setSummary(details.getSummary());
			existing.setImageUrl(details.getImageUrl());
			existing.setDate(details.getDate());
			existing.setTime(details.getTime());
			existing.setAuthor(details.getAuthor());
			return ResponseEntity.ok(service.saveNews(existing));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable String id) {
		service.deleteNews(id);
		return "Item deleted successfully!";
	}
}