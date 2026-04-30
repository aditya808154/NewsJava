package in.ap.main.Service;

import in.ap.main.Repository.BusinessDataRepository;
import in.ap.main.entity.BusinessData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BusinessDataService {

    @Autowired
    private BusinessDataRepository repository;

    public Map<String, Object> getCompleteBusinessLayout() {
        Map<String, Object> response = new HashMap<>();

        // 1. Sidebar Data
        Map<String, Object> sidebarData = new HashMap<>();
        // OrderByDateDesc use kar rahe hain taaki latest news pehle aaye
        sidebarData.put("recent_posts", repository.findBySectionOrderByDateDesc("recent_posts"));
        sidebarData.put("hot_categories", repository.findBySection("hot_category"));

        // 2. Main News Data
        Map<String, Object> businessNewsData = new HashMap<>();
        
        // UPDATE: Ab feature mein features.get(0) ki jagah poori list bhej rahe hain
        businessNewsData.put("feature", repository.findBySectionOrderByDateDesc("feature"));
        businessNewsData.put("grid_posts", repository.findBySectionOrderByDateDesc("grid_posts"));

        response.put("sidebarData", sidebarData);
        response.put("businessNewsData", businessNewsData);

        return response;
    }

    // CRUD Methods (Same rahenge)
    public BusinessData saveBusinessItem(BusinessData data) {
        return repository.save(data);
    }

    public Optional<BusinessData> getBusinessItemById(String id) {
        return repository.findById(id);
    }

    public void deleteBusinessItem(String id) {
        repository.deleteById(id);
    }
}