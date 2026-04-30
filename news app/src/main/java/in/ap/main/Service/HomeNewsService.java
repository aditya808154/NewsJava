package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import in.ap.main.Repository.HomeNewsRepository;
import in.ap.main.entity.HomeNews;
import java.util.List;
import java.util.Optional;

@Service
public class HomeNewsService {

    @Autowired
    private HomeNewsRepository repository;

    public HomeNews saveNews(HomeNews news) {
        return repository.save(news);
    }

    public List<HomeNews> getAllNews() {
        return repository.findAll();
    }

    public Optional<HomeNews> getById(String id) {
        return repository.findById(id);
    }

    public void deleteNews(String id) {
        repository.deleteById(id);
    }
}