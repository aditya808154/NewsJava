package in.ap.main.Controller;

import in.ap.main.Service.CategoryTwoService;
import in.ap.main.entity.CategoryTwo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/category-two")
public class CategoryTwoController {

    @Autowired
    private CategoryTwoService service;

    // 1. Add News (Banner or Healthcare or Restaurant)
    @PostMapping("/add")
    public CategoryTwo add(@RequestBody CategoryTwo news) {
        return service.saveNews(news);
    }

    // 2. Get Full Layout for Frontend
    @GetMapping("/layout")
    public Map<String, Object> getLayout() {
        return service.getCategoryTwoLayout();
    }

    // 3. Update
    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryTwo> update(@PathVariable String id, @RequestBody CategoryTwo details) {
        return service.getById(id).map(existing -> {
            existing.setSection(details.getSection());
            existing.setTitle(details.getTitle());
            existing.setSubtext(details.getSubtext());
            existing.setSummary(details.getSummary());
            existing.setImageUrl(details.getImageUrl());
            existing.setTime(details.getTime());
            existing.setDate(details.getDate());
            existing.setComments(details.getComments());
            return ResponseEntity.ok(service.saveNews(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id) {
        service.deleteNews(id);
        return "CategoryTwo item deleted!";
    }
}