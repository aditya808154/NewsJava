package in.ap.main.Controller;

import in.ap.main.Service.TravelService;
import in.ap.main.entity.Travel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/travel")
public class TravelController {

    @Autowired
    private TravelService service;

    // POST: Add new Travel News
    @PostMapping("/add")
    public Travel create(@RequestBody Travel news) {
        return service.saveTravelNews(news);
    }

    // GET: All Travel News for React Slider
    @GetMapping("/popular")
    public Map<String, List<Travel>> getAll() {
        Map<String, List<Travel>> response = new HashMap<>();
        response.put("travelNews", service.getAllTravelNews());
        return response;
    }

    // PUT: Update News
    @PutMapping("/update/{id}")
    public ResponseEntity<Travel> update(@PathVariable String id, @RequestBody Travel details) {
        return service.getById(id).map(existing -> {
            existing.setTitle(details.getTitle());
            existing.setCover(details.getCover());
            existing.setCatgeory(details.getCatgeory());
            existing.setDate(details.getDate());
            existing.setComments(details.getComments());
            existing.setContent(details.getContent());
            return ResponseEntity.ok(service.saveTravelNews(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE: Remove News
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        service.deleteNews(id);
        return ResponseEntity.ok("Travel News deleted successfully.");
    }
}