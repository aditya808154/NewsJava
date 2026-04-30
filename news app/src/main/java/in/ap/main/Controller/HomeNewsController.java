package in.ap.main.Controller;

import in.ap.main.Service.HomeNewsService;
import in.ap.main.entity.HomeNews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/homenews")
@CrossOrigin(originPatterns = "*", allowCredentials = "true") // CORS Fix
public class HomeNewsController {

    @Autowired
    private HomeNewsService service;

    // CREATE (Postman ya Frontend se add karne ke liye)
    @PostMapping("/add")
    public HomeNews addNews(@RequestBody HomeNews news) {
        return service.saveNews(news);
    }

    // READ ALL (React frontend ke liye)
    @GetMapping("/popular")
    public Map<String, List<HomeNews>> getAllNews() {
        Map<String, List<HomeNews>> response = new HashMap<>();
        response.put("homeNewsData", service.getAllNews());
        return response;
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<HomeNews> update(@PathVariable String id, @RequestBody HomeNews details) {
        return service.getById(id).map(existing -> {
            existing.setTitle(details.getTitle());
            existing.setSummary(details.getSummary());
            existing.setTime(details.getTime());
            existing.setCat(details.getCat());
            existing.setImg(details.getImg());
            return ResponseEntity.ok(service.saveNews(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        service.deleteNews(id);
        return ResponseEntity.ok("Home news deleted successfully!");
    }
}