package in.ap.main.Controller;

import in.ap.main.Service.CategoryDefaultService;
import in.ap.main.entity.CategoryDefault;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/category-default")
public class CategoryDefaultController {

    @Autowired
    private CategoryDefaultService service;

    // 1. Add News
    @PostMapping("/add")
    public CategoryDefault add(@RequestBody CategoryDefault news) {
        return service.saveNews(news);
    }

    // 2. Get Structured Data for Frontend
    @GetMapping("/all")
    public Map<String, Object> getFullData() {
        return service.getCategorizedData();
    }

    // 3. Update News
    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryDefault> update(@PathVariable String id, @RequestBody CategoryDefault details) {
        return service.getById(id).map(existing -> {
            existing.setSection(details.getSection());
            existing.setCategory(details.getCategory());
            existing.setTitle(details.getTitle());
            existing.setSummary(details.getSummary());
            existing.setImageUrl(details.getImageUrl());
            existing.setTime(details.getTime());
            existing.setDate(details.getDate());
            existing.setType(details.getType());
            existing.setMediaUrl(details.getMediaUrl());
            existing.setComments(details.getComments());
            return ResponseEntity.ok(service.saveNews(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. Delete News
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id) {
        service.deleteNews(id);
        return "News deleted successfully!";
    }
}