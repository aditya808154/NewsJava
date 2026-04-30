package in.ap.main.Service;

import in.ap.main.Repository.GalleryPostRepository;
import in.ap.main.entity.GalleryPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class GalleryPostService {

    @Autowired
    private GalleryPostRepository repository;

    public Map<String, Object> getGalleryPostLayout() {
        Map<String, Object> response = new HashMap<>();

        // 1. Sabhi Main Posts (Slider ke liye)
        List<GalleryPost> mainPosts = repository.findBySection("main_post");
        response.put("main_post", mainPosts); // Index 0 ki jagah puri list bhej rahe hain

        // 2. Sidebar Recent Posts
        List<GalleryPost> recentPosts = repository.findBySection("recent_posts");
        response.put("recent_posts", recentPosts);

        // 3. Category List
        List<GalleryPost> categories = repository.findBySection("category_list");
        response.put("category_list", categories);

        // 4. Static / Default Data
        response.put("state", Arrays.asList("India", "Maharashtra", "Mumbai", "Delhi", "Rajasthan"));
        
        return response;
    }

    public GalleryPost save(GalleryPost post) { return repository.save(post); }
    public Optional<GalleryPost> getById(String id) { return repository.findById(id); }
    public void delete(String id) { repository.deleteById(id); }
}