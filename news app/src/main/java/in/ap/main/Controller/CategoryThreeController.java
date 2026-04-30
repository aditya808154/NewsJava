package in.ap.main.Controller;

import in.ap.main.Service.CategoryThreeService;
import in.ap.main.entity.CategoryThree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/category-three")
public class CategoryThreeController {

    @Autowired
    private CategoryThreeService service;

    // 1. CREATE
    @PostMapping("/add")
    public CategoryThree add(@RequestBody CategoryThree news) {
        return service.saveNews(news);
    }

    // 2. READ (Full Layout)
    @GetMapping("/layout")
    public Map<String, Object> getLayout() {
        return service.getCategoryThreeLayout();
    }

    // 3. UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryThree> update(@PathVariable String id, @RequestBody CategoryThree details) {
        return service.getById(id).map(existing -> {
            existing.setSection(details.getSection());
            existing.setCategory(details.getCategory());
            existing.setTitle(details.getTitle());
            existing.setSummary(details.getSummary());
            existing.setImageUrl(details.getImageUrl());
            existing.setTime(details.getTime());
            existing.setDate(details.getDate());
            existing.setComments(details.getComments());
            return ResponseEntity.ok(service.saveNews(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. DELETE
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id) {
        service.deleteNews(id);
        return "CategoryThree item deleted successfully!";
    }
}