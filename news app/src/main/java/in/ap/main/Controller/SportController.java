package in.ap.main.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.ap.main.Service.SportService;
import in.ap.main.entity.Sport;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sport")

public class SportController {

    @Autowired
    private SportService service;

    // CREATE
    @PostMapping("/add")
    public Sport createSport(@RequestBody Sport sport) {
        return service.saveSportNews(sport);
    }

    // READ ALL
    @GetMapping("/popular")
    public Map<String, List<Sport>> getAllSports() {
        Map<String, List<Sport>> response = new HashMap<>();
        response.put("popularNews", service.getAllSports());
        return response;
    }

    // READ SINGLE
    @GetMapping("/{id}")
    public ResponseEntity<Sport> getSportById(@PathVariable String id) {
        return service.getSportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE (Added same as NewsPub)
    @PutMapping("/update/{id}")
    public ResponseEntity<Sport> updateSport(@PathVariable String id, @RequestBody Sport details) {
        return service.getSportById(id)
                .map(existing -> {
                    existing.setTitle(details.getTitle());
                    existing.setCover(details.getCover());
                    existing.setCategory(details.getCategory());
                    existing.setDate(details.getDate());
                    existing.setComments(details.getComments());
                    existing.setContent(details.getContent());
                    return ResponseEntity.ok(service.saveSportNews(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSport(@PathVariable String id) {
        service.deleteSport(id);
        return ResponseEntity.ok("Sport News deleted successfully.");
    }
}