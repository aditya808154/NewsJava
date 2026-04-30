package in.ap.main.Service;

import in.ap.main.Repository.VideoPostRepository;
import in.ap.main.entity.VideoPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class VideoPostService {

    @Autowired
    private VideoPostRepository repository;

    public Map<String, Object> getVideoLayout() {
        Map<String, Object> response = new HashMap<>();

        // 1. Saari Main Series nikalna (Multiple data support ke liye)
        List<VideoPost> mainSeries = repository.findBySection("main_series");
        
        // Frontend ko easy pade isliye hum list direct bhej rahe hain
        response.put("main_series", mainSeries);

        // 2. Sidebar Data (Inhe independent rakha hai taaki main data na hone par bhi ye dikhein)
        List<VideoPost> recentVideos = repository.findBySection("recent_videos");
        List<VideoPost> categories = repository.findBySection("category_list");

        // Response structure ko organize karna
        Map<String, Object> sidebar = new HashMap<>();
        sidebar.put("recentPosts", recentVideos);
        sidebar.put("categories", categories);

        // Popular Tags nikalne ke liye logic (Pehli post se ya default list)
        if (!mainSeries.isEmpty()) {
            sidebar.put("popularTags", mainSeries.get(0).getPopularTags());
        } else {
            sidebar.put("popularTags", new ArrayList<String>());
        }

        response.put("sidebar", sidebar);

        return response;
    }

    public Optional<VideoPost> getById(String id) {
        return repository.findById(id);
    }

    public VideoPost save(VideoPost post) { 
        return repository.save(post); 
    }

    public void delete(String id) { 
        repository.deleteById(id); 
    }
}