package in.ap.main.Service;

import in.ap.main.Repository.BreakingNewsRepository;
import in.ap.main.entity.BreakingNews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BreakingNewsService {

    @Autowired
    private BreakingNewsRepository repository;

    public BreakingNews saveNews(BreakingNews news) {
        return repository.save(news);
    }

    public List<BreakingNews> getAll() {
        return repository.findAll();
    }

    public Optional<BreakingNews> getById(String id) {
        return repository.findById(id);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}