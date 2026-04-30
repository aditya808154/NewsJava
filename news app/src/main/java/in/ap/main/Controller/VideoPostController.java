package in.ap.main.Controller;

import in.ap.main.Service.VideoPostService;
import in.ap.main.entity.VideoPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/video-posts")
@CrossOrigin(originPatterns = "*")
public class VideoPostController {

    @Autowired
    private VideoPostService service;

    @GetMapping("/layout")
    public Map<String, Object> getLayout() {
        return service.getVideoLayout();
    }

    @PostMapping("/add")
    public VideoPost add(@RequestBody VideoPost post) {
        return service.save(post);
    }

    // --- UPDATE METHOD START ---
    @PutMapping("/update/{id}")
    public ResponseEntity<VideoPost> update(@PathVariable String id, @RequestBody VideoPost newData) {
        // Pehle check karte hain ki record exist karta hai ya nahi
        return service.getById(id).map(existingPost -> {
            // Saare fields update kar rahe hain
            existingPost.setBaseTitle(newData.getBaseTitle());
            existingPost.setDate(newData.getDate());
            existingPost.setTime(newData.getTime());
            existingPost.setReadTime(newData.getReadTime());
            existingPost.setSection(newData.getSection());
            existingPost.setImageUrl(newData.getImageUrl());
            existingPost.setVideoId(newData.getVideoId());
            existingPost.setCategoryName(newData.getCategoryName());
            existingPost.setCount(newData.getCount());
            existingPost.setPopularTags(newData.getPopularTags());
            existingPost.setVideoListData(newData.getVideoListData()); // JSON String update

            VideoPost updatedPost = service.save(existingPost);
            return ResponseEntity.ok(updatedPost);
        }).orElse(ResponseEntity.notFound().build());
    }
    // --- UPDATE METHOD END ---

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        service.delete(id);
        return "Deleted successfully";
    }
}