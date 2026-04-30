package in.ap.main.Controller;

import in.ap.main.Service.LiveArticleService;
import in.ap.main.entity.LiveArticle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/live")
public class LiveArticleController {

    @Autowired
    private LiveArticleService service;

    @PostMapping("/add")
    public LiveArticle create(@RequestBody LiveArticle article) {
        return service.saveLiveArticle(article);
    }

    @GetMapping("/popular")
    public Map<String, List<LiveArticle>> getAll() {
        Map<String, List<LiveArticle>> response = new HashMap<>();
        response.put("liveArticleData", service.getAllLiveArticles());
        return response;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<LiveArticle> update(@PathVariable String id, @RequestBody LiveArticle details) {
        return service.getById(id).map(existing -> {
            existing.setTitle(details.getTitle());
            existing.setCategory(details.getCategory());
            existing.setTime(details.getTime());
            existing.setThumbnail(details.getThumbnail());
            existing.setSummary(details.getSummary());
            existing.setFullContent(details.getFullContent());
            existing.setIsBreaking(details.isIsBreaking());
            
            // Video fields update
            existing.setMediaType(details.getMediaType());
            existing.setVideoUrl(details.getVideoUrl());
            
            return ResponseEntity.ok(service.saveLiveArticle(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        service.deleteArticle(id);
        return ResponseEntity.ok("Live Article deleted successfully.");
    }
}