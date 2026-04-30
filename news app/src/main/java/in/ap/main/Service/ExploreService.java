package in.ap.main.Service;

import in.ap.main.Repository.ExploreRepository;
import in.ap.main.entity.ExploreNews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ExploreService {

    @Autowired
    private ExploreRepository repository;

    public ExploreNews saveNews(ExploreNews news) {
        return repository.save(news);
    }

    public List<ExploreNews> getAllNews() {
        return repository.findAll();
    }

    public Optional<ExploreNews> getById(String id) {
        return repository.findById(id);
    }

    public void deleteNews(String id) {
        repository.deleteById(id);
    }
}