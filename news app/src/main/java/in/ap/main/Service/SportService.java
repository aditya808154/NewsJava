package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import in.ap.main.Repository.SportRepository;
import in.ap.main.entity.Sport;

import java.util.List;
import java.util.Optional;

@Service
public class SportService {

    @Autowired
    private SportRepository repository;

    @Transactional
    public Sport saveSportNews(Sport sport) {
        return repository.save(sport);
    }

    public List<Sport> getAllSports() {
        return repository.findAll();
    }

    public Optional<Sport> getSportById(String id) {
        return repository.findById(id);
    }

    @Transactional
    public void deleteSport(String id) {
        repository.deleteById(id);
    }
}