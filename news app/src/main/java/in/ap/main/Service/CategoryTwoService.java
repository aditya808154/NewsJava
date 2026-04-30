package in.ap.main.Service;

import in.ap.main.Repository.CategoryTwoRepository;
import in.ap.main.entity.CategoryTwo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CategoryTwoService {

    @Autowired
    private CategoryTwoRepository repository;

    public CategoryTwo saveNews(CategoryTwo news) {
        return repository.save(news);
    }

    public Map<String, Object> getCategoryTwoLayout() {
        Map<String, Object> response = new HashMap<>();
        
        // FIX: Banner ko poori List ki tarah bhejein taaki Slider aur Admin Panel saare banners dikha sake
        List<CategoryTwo> bannerList = repository.findBySection("banner");
        response.put("banner", bannerList);

        // Healthcare aur Hotel lists ko fetch karein
        List<CategoryTwo> healthcareList = repository.findBySection("healthcare");
        response.put("healthcare", healthcareList);

        List<CategoryTwo> hotelList = repository.findBySection("hotel_restaurant");
        response.put("hotel_restaurant", hotelList);

        return response;
    }

    public void deleteNews(String id) {
        repository.deleteById(id);
    }

    public Optional<CategoryTwo> getById(String id) {
        return repository.findById(id);
    }
}