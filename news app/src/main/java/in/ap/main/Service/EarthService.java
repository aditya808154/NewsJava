package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import in.ap.main.Repository.EarthRepository;
import in.ap.main.entity.Earth;
import java.util.List;
import java.util.Optional;

@Service
public class EarthService {

    @Autowired
    private EarthRepository repository;

    public Earth saveEarthNews(Earth news) {
        return repository.save(news);
    }

    public List<Earth> getAllEarthNews() {
        return repository.findAll();
    }

    public Optional<Earth> getById(String id) {
        return repository.findById(id);
    }

    public void deleteNews(String id) {
        repository.deleteById(id);
    }
}