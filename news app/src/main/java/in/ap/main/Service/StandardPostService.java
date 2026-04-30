package in.ap.main.Service;

import in.ap.main.Repository.StandardPostRepository;
import in.ap.main.entity.StandardPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class StandardPostService {

    @Autowired
    private StandardPostRepository repository;

    public Map<String, Object> getPostLayout() {
        Map<String, Object> response = new HashMap<>();

        // --- Frontend Dashboard naming ke sath match karne ke liye keys change ki gayi hain ---

        // 1. Main Post (Frontend expects "main_post" in rawMapData)
        List<StandardPost> mainPosts = repository.findBySection("main_post");
        response.put("main_post", mainPosts); // Yahan "main_post" rakhein taaki Admin dashboard list dikha sake

        // 2. Sidebar Data
        // Frontend dashboard direct layout se sections uthata hai, isliye sidebar map ke bajaye direct keys dein
        response.put("recent_posts", repository.findBySection("recent_posts"));
        response.put("category_list", repository.findBySection("category_list"));

        // 3. Static/Extra Data
        response.put("state", Arrays.asList("India", "UP", "Basti"));
        
        Map<String, String> comment = new HashMap<>();
        comment.put("author", "Admin");
        comment.put("date", "August 20, 2022 at 6:05 pm");
        comment.put("text", "Only a quid bum bag cheeky bugger geeza car boot...");
        response.put("comment", comment);

        return response;
    }

    public StandardPost save(StandardPost post) { return repository.save(post); }
    public Optional<StandardPost> getById(String id) { return repository.findById(id); }
    public void delete(String id) { repository.deleteById(id); }
}