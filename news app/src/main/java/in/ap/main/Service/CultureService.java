package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import in.ap.main.Repository.CultureRepository;
import in.ap.main.entity.Culture;
import java.util.List;
import java.util.Optional;

@Service
public class CultureService {

    @Autowired
    private CultureRepository repository;

    public Culture saveCultureNews(Culture news) {
        return repository.save(news);
    }

    public List<Culture> getAllCultureNews() {
        return repository.findAll();
    }

    public Optional<Culture> getById(String id) {
        return repository.findById(id);
    }

    public void deleteNews(String id) {
        repository.deleteById(id);
    }
}