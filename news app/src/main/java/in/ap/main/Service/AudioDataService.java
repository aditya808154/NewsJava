package in.ap.main.Service;

import in.ap.main.Repository.AudioDataRepository;
import in.ap.main.entity.AudioData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AudioDataService {

    @Autowired
    private AudioDataRepository repository;

    public Map<String, Object> getAudioLayout() {
        Map<String, Object> response = new HashMap<>();

        // 1. Saare Main Podcasts fetch karein (Multiple Products ke liye)
        List<AudioData> mainPodcasts = repository.findBySection("main_podcast");
        
        // Agar list khali nahi hai, toh response build karein
        if (!mainPodcasts.isEmpty()) {
            // Hum saari list bhej rahe hain taaki frontend "Multiple Products" dikha sake
            response.put("main_podcasts", mainPodcasts);

            // 2. Sidebar Data
            Map<String, Object> sidebar = new HashMap<>();
            
            // Recent Posts (News or secondary links)
            sidebar.put("recentPosts", repository.findBySection("recent_posts"));
            
            // Category List
            sidebar.put("categories", repository.findBySection("category_list"));
            
            // Popular Tags (Sabhi main podcasts ke tags ko merge karke bhej rahe hain)
            Set<String> allTags = mainPodcasts.stream()
                    .map(AudioData::getPopularTags)
                    .filter(Objects::nonNull)
                    .flatMap(List::stream)
                    .collect(Collectors.toSet());
            
            sidebar.put("popularTags", allTags);
            
            response.put("sidebar", sidebar);
        } else {
            // Default empty response agar data na ho
            response.put("main_podcasts", new ArrayList<>());
            response.put("sidebar", new HashMap<>());
        }

        return response;
    }

    // Single product/podcast by ID (Useful for detail pages)
    public Optional<AudioData> getById(String id) { 
        return repository.findById(id); 
    }

    public AudioData save(AudioData data) { 
        return repository.save(data); 
    }

    public void delete(String id) { 
        repository.deleteById(id); 
    }
    
    // Multiple sections ke basis par data lane ke liye helper
    public List<AudioData> getBySection(String section) {
        return repository.findBySection(section);
    }
}