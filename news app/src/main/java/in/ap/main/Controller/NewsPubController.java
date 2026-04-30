package in.ap.main.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.ap.main.Service.NewsPubService;
import in.ap.main.entity.NewsPub;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
public class NewsPubController {

    @Autowired
    private NewsPubService service;

    // CREATE
    @PostMapping("/add")
    public NewsPub createNews(@RequestBody NewsPub news) {
        return service.saveNews(news);
    }

    // READ ALL
    @GetMapping("/popular")
    public Map<String, List<NewsPub>> getAllNews() {
        Map<String, List<NewsPub>> response = new HashMap<>();
        response.put("popularNews", service.getAllNews());
        return response;
    }

    // READ SINGLE
    @GetMapping("/{id}")
    public ResponseEntity<NewsPub> getNewsById(@PathVariable String id) {
        return service.getNewsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<NewsPub> updateNews(
            @PathVariable String id,
            @RequestBody NewsPub newsDetails) {

        return service.getNewsById(id)
                .map(existing -> {
                    existing.setTitle(newsDetails.getTitle());
                    existing.setCover(newsDetails.getCover());
                    existing.setCategory(newsDetails.getCategory());
                    existing.setDate(newsDetails.getDate());
                    existing.setComments(newsDetails.getComments());
                    existing.setContent(newsDetails.getContent());
                    return ResponseEntity.ok(service.saveNews(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNews(@PathVariable String id) {
        service.deleteNews(id);
        return ResponseEntity.ok("News with ID " + id + " deleted successfully.");
    }
}
