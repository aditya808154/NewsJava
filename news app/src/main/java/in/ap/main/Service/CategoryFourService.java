package in.ap.main.Service;

import in.ap.main.Repository.CategoryFourRepository;
import in.ap.main.entity.CategoryFour;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CategoryFourService {

	@Autowired
	private CategoryFourRepository repository;

	public CategoryFour saveNews(CategoryFour news) {
		return repository.save(news);
	}

	public Map<String, Object> getCategoryFourLayout() {
		Map<String, Object> response = new HashMap<>();

		// Dono sections sorted aayenge
		List<CategoryFour> features = repository.findBySectionOrderByCreatedAtDesc("feature");
		List<CategoryFour> gridPosts = repository.findBySectionOrderByCreatedAtDesc("grid_posts");

		response.put("feature", features != null ? features : new ArrayList<>());
		response.put("grid_posts", gridPosts != null ? gridPosts : new ArrayList<>());
		response.put("totalItems", gridPosts != null ? gridPosts.size() : 0);

		return response;
	}

	public Optional<CategoryFour> getById(String id) {
		return repository.findById(id);
	}

	public void deleteNews(String id) {
		repository.deleteById(id);
	}
}