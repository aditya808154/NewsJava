package in.ap.main.Controller;

import in.ap.main.Service.GalleryPostService;
import in.ap.main.entity.GalleryPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/gallery-post")
public class GalleryPostController {

    @Autowired
    private GalleryPostService service;

    @GetMapping("/layout")
    public ResponseEntity<Map<String, Object>> getLayout() {
        return ResponseEntity.ok(service.getGalleryPostLayout());
    }

    @PostMapping("/add")
    public GalleryPost add(@RequestBody GalleryPost post) {
        return service.save(post);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GalleryPost> update(@PathVariable String id, @RequestBody GalleryPost newData) {
        return service.getById(id).map(post -> {
            post.setTitle(newData.getTitle());
            post.setContent(newData.getContent());
            post.setGalleryImages(newData.getGalleryImages());
            post.setTags(newData.getTags());
            post.setSection(newData.getSection());
            post.setCommentsCount(newData.getCommentsCount());
            post.setReadTime(newData.getReadTime());
            // Sidebar updates
            post.setImageUrl(newData.getImageUrl());
            post.setCategoryName(newData.getCategoryName());
            post.setBg(newData.getBg());
            post.setCount(newData.getCount());
            return ResponseEntity.ok(service.save(post));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id) {
        service.delete(id);
        return "Gallery Post deleted successfully";
    }
}