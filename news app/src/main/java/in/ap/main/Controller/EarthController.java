package in.ap.main.Controller;

import in.ap.main.Service.EarthService;
import in.ap.main.entity.Earth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/earth")
public class EarthController {

    @Autowired
    private EarthService service;

    // POST: Add new Earth news
    @PostMapping("/add")
    public Earth create(@RequestBody Earth news) {
        return service.saveEarthNews(news);
    }

    // GET: All news for React (Key: earthNews)
    @GetMapping("/popular")
    public Map<String, List<Earth>> getAll() {
        Map<String, List<Earth>> response = new HashMap<>();
        response.put("earthNews", service.getAllEarthNews());
        return response;
    }

    // PUT: Update existing news
    @PutMapping("/update/{id}")
    public ResponseEntity<Earth> update(@PathVariable String id, @RequestBody Earth details) {
        return service.getById(id).map(existing -> {
            existing.setTitle(details.getTitle());
            existing.setCover(details.getCover());
            existing.setCatgeory(details.getCatgeory());
            existing.setDate(details.getDate());
            existing.setComments(details.getComments());
            existing.setContent(details.getContent());
            return ResponseEntity.ok(service.saveEarthNews(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE: Delete news
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        service.deleteNews(id);
        return ResponseEntity.ok("Earth News deleted successfully.");
    }
}