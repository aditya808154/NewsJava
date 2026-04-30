package in.ap.main.Controller;

import in.ap.main.Service.ExploreService;
import in.ap.main.entity.ExploreNews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/explore")
public class ExploreController {

    @Autowired
    private ExploreService service;

    // 1. Create (Add News)
    @PostMapping("/add")
    public ExploreNews add(@RequestBody ExploreNews news) {
        return service.saveNews(news);
    }

    // 2. Read (Get All News)
    @GetMapping("/all")
    public List<ExploreNews> getAll() {
        return service.getAllNews();
    }

    // 3. Update
    @PutMapping("/update/{id}")
    public ResponseEntity<ExploreNews> update(@PathVariable String id, @RequestBody ExploreNews details) {
        return service.getById(id).map(existing -> {
            existing.setHeading(details.getHeading());
            existing.setSummary(details.getSummary());
            existing.setTime(details.getTime());
            existing.setRegion(details.getRegion());
            existing.setImageUrl(details.getImageUrl());
            return ResponseEntity.ok(service.saveNews(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        service.deleteNews(id);
        return ResponseEntity.ok("Explore News deleted successfully.");
    }
}