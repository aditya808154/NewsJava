package in.ap.main.Controller;

import in.ap.main.Service.CultureService;
import in.ap.main.entity.Culture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/culture")
public class CultureController {

    @Autowired
    private CultureService service;

    // CREATE
    @PostMapping("/add")
    public Culture create(@RequestBody Culture news) {
        return service.saveCultureNews(news);
    }

    // READ ALL (Response key: cultureNews)
    @GetMapping("/popular")
    public Map<String, List<Culture>> getAll() {
        Map<String, List<Culture>> response = new HashMap<>();
        response.put("cultureNews", service.getAllCultureNews());
        return response;
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<Culture> update(@PathVariable String id, @RequestBody Culture details) {
        return service.getById(id).map(existing -> {
            existing.setTitle(details.getTitle());
            existing.setCover(details.getCover());
            existing.setCatgeory(details.getCatgeory());
            existing.setDate(details.getDate());
            existing.setComments(details.getComments());
            existing.setContent(details.getContent());
            return ResponseEntity.ok(service.saveCultureNews(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        service.deleteNews(id);
        return ResponseEntity.ok("Culture News deleted successfully.");
    }
}