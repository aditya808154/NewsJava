package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import in.ap.main.Repository.BusinessRepository;
import in.ap.main.entity.Business;

import java.util.List;
import java.util.Optional;

@Service
public class BusinessService {

    @Autowired
    private BusinessRepository repository;

    public Business saveBusinessNews(Business news) {
        return repository.save(news);
    }

    public List<Business> getAllBusinessNews() {
        return repository.findAll();
    }

    public Optional<Business> getBusinessById(String id) {
        return repository.findById(id);
    }

    public void deleteBusinessNews(String id) {
        repository.deleteById(id);
    }
}