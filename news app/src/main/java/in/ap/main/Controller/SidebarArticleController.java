package in.ap.main.Controller;

import in.ap.main.Service.SidebarArticleService;
import in.ap.main.entity.SidebarArticle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/sidebar-article")
public class SidebarArticleController {

    @Autowired
    private SidebarArticleService service;

    @GetMapping("/layout")
    public Map<String, Object> getLayout() {
        return service.getArticleLayout();
    }

    @PostMapping("/add")
    public SidebarArticle add(@RequestBody SidebarArticle data) {
        return service.save(data);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SidebarArticle> update(@PathVariable String id, @RequestBody SidebarArticle newData) {
        return service.getById(id).map(existing -> {
            existing.setTitle(newData.getTitle());
            existing.setContent(newData.getContent());
            existing.setFeaturedImage(newData.getFeaturedImage());
            existing.setDate(newData.getDate());
            existing.setTime(newData.getTime());
            existing.setTags(newData.getTags());
            existing.setPopularTags(newData.getPopularTags());
            existing.setAdImageUrl(newData.getAdImageUrl());
            existing.setAdText(newData.getAdText());
            return ResponseEntity.ok(service.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        service.delete(id);
        return "Article Deleted";
    }
}