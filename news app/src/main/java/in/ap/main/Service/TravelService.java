package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import in.ap.main.Repository.TravelRepository;
import in.ap.main.entity.Travel;
import java.util.List;
import java.util.Optional;

@Service
public class TravelService {

	@Autowired
	private TravelRepository repository;

	public Travel saveTravelNews(Travel news) {
		return repository.save(news);
	}

	public List<Travel> getAllTravelNews() {
		return repository.findAll();
	}

	public Optional<Travel> getById(String id) {
		return repository.findById(id);
	}

	public void deleteNews(String id) {
		repository.deleteById(id);
	}
}