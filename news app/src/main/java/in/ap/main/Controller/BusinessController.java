package in.ap.main.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.ap.main.Service.BusinessService;
import in.ap.main.entity.Business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/business")
public class BusinessController {

    @Autowired
    private BusinessService service;

    // CREATE News
    @PostMapping("/add")
    public Business createBusinessNews(@RequestBody Business news) {
        return service.saveBusinessNews(news);
    }

    // READ ALL News (React compatible response)
    @GetMapping("/popular")
    public Map<String, List<Business>> getAllBusinessNews() {
        Map<String, List<Business>> response = new HashMap<>();
        response.put("businessNews", service.getAllBusinessNews());
        return response;
    }

    // UPDATE News
    @PutMapping("/update/{id}")
    public ResponseEntity<Business> updateBusinessNews(@PathVariable String id, @RequestBody Business details) {
        return service.getBusinessById(id)
                .map(existing -> {
                    existing.setTitle(details.getTitle());
                    existing.setCover(details.getCover());
                    existing.setCategory(details.getCategory());
                    existing.setDate(details.getDate());
                    existing.setComments(details.getComments());
                    existing.setContent(details.getContent());
                    return ResponseEntity.ok(service.saveBusinessNews(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE News
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBusinessNews(@PathVariable String id) {
        service.deleteBusinessNews(id);
        return ResponseEntity.ok("Business News deleted successfully.");
    }
}