package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import in.ap.main.Repository.InnovationRepository;
import in.ap.main.entity.Innovation;
import java.util.List;
import java.util.Optional;

@Service
public class InnovationService {

    @Autowired
    private InnovationRepository repository;

    public Innovation saveInnovationNews(Innovation news) {
        return repository.save(news);
    }

    public List<Innovation> getAllInnovationNews() {
        return repository.findAll();
    }

    public Optional<Innovation> getById(String id) {
        return repository.findById(id);
    }

    public void deleteNews(String id) {
        repository.deleteById(id);
    }
}