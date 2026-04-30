package in.ap.main.Service;

import in.ap.main.Repository.CategoryOneRepository;
import in.ap.main.entity.CategoryOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CategoryOneService {

    @Autowired
    private CategoryOneRepository repository;

    public CategoryOne saveNews(CategoryOne news) {
        return repository.save(news);
    }

    public Map<String, Object> getCategoryOneLayout() {
        Map<String, Object> response = new HashMap<>();
        
        // 1. Fetch all data from database
        List<CategoryOne> allNews = repository.findAll();

        // 2. Filter by Section and Sort (Latest news first using reverse order of ID or Date)
        // Feature news - ab ye puri list bhejega
        List<CategoryOne> featureList = allNews.stream()
                .filter(n -> "feature".equalsIgnoreCase(n.getSection()))
                .sorted(Comparator.comparing(CategoryOne::getId).reversed())
                .collect(Collectors.toList());

        // Business news
        List<CategoryOne> businessList = allNews.stream()
                .filter(n -> "business".equalsIgnoreCase(n.getSection()))
                .sorted(Comparator.comparing(CategoryOne::getId).reversed())
                .collect(Collectors.toList());

        // IT news
        List<CategoryOne> itList = allNews.stream()
                .filter(n -> "it".equalsIgnoreCase(n.getSection()))
                .sorted(Comparator.comparing(CategoryOne::getId).reversed())
                .collect(Collectors.toList());

        // Response structure
        response.put("feature", featureList); // Ab yahan puri list ja rahi hai
        response.put("business", businessList);
        response.put("it", itList);

        // 3. States List (As it is)
        List<Map<String, String>> states = Arrays.asList(
            createState("Maharashtra", "maharashtra"),
            createState("Gujarat", "gujarat"),
            createState("Tamil Nadu", "tamil-nadu"),
            createState("West Bengal", "west-bengal"),
            createState("Karnataka", "karnataka"),
            createState("Uttar Pradesh", "uttar-pradesh"),
            createState("Kerala", "kerala"),
            createState("Rajasthan", "rajasthan")
        );
        response.put("states", states);

        return response;
    }

    private Map<String, String> createState(String name, String slug) {
        Map<String, String> state = new HashMap<>();
        state.put("name", name);
        state.put("slug", slug);
        return state;
    }

    public void deleteNews(String id) {
        repository.deleteById(id);
    }
}