package in.ap.main.Service;

import in.ap.main.Repository.CategoryThreeRepository;
import in.ap.main.entity.CategoryThree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CategoryThreeService {

    @Autowired
    private CategoryThreeRepository repository;

    public CategoryThree saveNews(CategoryThree news) {
        return repository.save(news);
    }

    public Map<String, Object> getCategoryThreeLayout() {
        Map<String, Object> response = new HashMap<>();
        
        // 1. Feature, Latest, aur Recent data database se fetch karein
        response.put("feature", repository.findBySection("feature")); 
        response.put("latest_releases", repository.findBySection("latest_releases"));
        response.put("recent_posts", repository.findBySection("recent_posts"));

        /* 2. UPDATE: Hot Categories ab database se aayengi.
           Aapko database mein "section" column mein "hot_categories" likhna hoga 
           taaki naya data yahan auto-add ho jaye.
        */
        List<CategoryThree> hotCats = repository.findBySection("hot_categories");
        
        if (hotCats.isEmpty()) {
            // Agar database khali hai toh purana static data fallback ki tarah dikhega
            response.put("hot_categories", Arrays.asList(
                createCategory("Movies", 124, "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=100"),
                createCategory("Live Music", 45, "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100"),
                createCategory("Celebrity", 210, "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=100")
            ));
        } else {
            response.put("hot_categories", hotCats);
        }

        return response;
    }

    // Helper method static data ke liye
    private Map<String, Object> createCategory(String name, int count, String img) {
        Map<String, Object> cat = new HashMap<>();
        cat.put("name", name);
        cat.put("count", count);
        cat.put("imageUrl", img);
        return cat;
    }

    public void deleteNews(String id) {
        repository.deleteById(id);
    }

    public Optional<CategoryThree> getById(String id) {
        return repository.findById(id);
    }
}