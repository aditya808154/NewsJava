package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import in.ap.main.Repository.LiveArticleRepository;
import in.ap.main.entity.LiveArticle;
import java.util.List;
import java.util.Optional;

@Service
public class LiveArticleService {

    @Autowired
    private LiveArticleRepository repository;

    public LiveArticle saveLiveArticle(LiveArticle article) {
        return repository.save(article);
    }

    public List<LiveArticle> getAllLiveArticles() {
        return repository.findAll();
    }

    public Optional<LiveArticle> getById(String id) {
        return repository.findById(id);
    }

    public void deleteArticle(String id) {
        repository.deleteById(id);
    }
}