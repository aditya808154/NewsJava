package in.ap.main.Controller;

import in.ap.main.Service.InnovationService;
import in.ap.main.entity.Innovation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/innovation")
public class InnovationController {

    @Autowired
    private InnovationService service;

    // CREATE
    @PostMapping("/add")
    public Innovation create(@RequestBody Innovation news) {
        return service.saveInnovationNews(news);
    }

    // READ ALL (Matched with React key: innovationNews)
    @GetMapping("/popular")
    public Map<String, List<Innovation>> getAll() {
        Map<String, List<Innovation>> response = new HashMap<>();
        response.put("innovationNews", service.getAllInnovationNews());
        return response;
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<Innovation> update(@PathVariable String id, @RequestBody Innovation details) {
        return service.getById(id).map(existing -> {
            existing.setTitle(details.getTitle());
            existing.setCover(details.getCover());
            existing.setCatgeory(details.getCatgeory());
            existing.setDate(details.getDate());
            existing.setComments(details.getComments());
            existing.setContent(details.getContent());
            return ResponseEntity.ok(service.saveInnovationNews(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        service.deleteNews(id);
        return ResponseEntity.ok("Innovation News deleted successfully.");
    }
}