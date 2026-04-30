package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import in.ap.main.Repository.NewsPubRepository;
import in.ap.main.entity.NewsPub;

import java.util.List;
import java.util.Optional;

@Service
public class NewsPubService {

	@Autowired
	private NewsPubRepository repository;

	public NewsPub saveNews(NewsPub news) {
		return repository.save(news);
	}

	public List<NewsPub> getAllNews() {
		return repository.findAll();
	}

	public Optional<NewsPub> getNewsById(String id) {
		return repository.findById(id);
	}

	public void deleteNews(String id) {
		repository.deleteById(id);
	}
}
