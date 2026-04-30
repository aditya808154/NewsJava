package in.ap.main.Service;

import in.ap.main.Repository.CategoryDefaultRepository;
import in.ap.main.entity.CategoryDefault;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CategoryDefaultService {

    @Autowired
    private CategoryDefaultRepository repository;

    public CategoryDefault saveNews(CategoryDefault news) {
        return repository.save(news);
    }

    public Map<String, Object> getCategorizedData() {
        Map<String, Object> result = new HashMap<>();
        
        // UPDATE: Yahan se .get(0) hata diya hai, ab poori List jayegi
        result.put("feature", repository.findBySection("feature"));

        // Baaki sections pehle ki tarah List hi bhejenge
        result.put("sidebar", repository.findBySection("sidebar"));
        result.put("sport", repository.findBySection("sport"));
        result.put("manoranjan", repository.findBySection("manoranjan"));
        result.put("game", repository.findBySection("game"));

        return result;
    }

    public Optional<CategoryDefault> getById(String id) {
        return repository.findById(id);
    }

    public void deleteNews(String id) {
        repository.deleteById(id);
    }
}