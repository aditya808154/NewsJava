package in.ap.main.Service;

import in.ap.main.Repository.SportDataRepository;
import in.ap.main.entity.SportData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class SportDataService {

    @Autowired
    private SportDataRepository repository;

    public Map<String, Object> getSportFullLayout() {
        Map<String, Object> response = new HashMap<>();

        // 1. Focus Story - Ab ye poori list bhejega (Multiple items)
        List<SportData> focusList = repository.findBySection("focus_story");
        response.put("focus_story", focusList); // .get(0) hata diya

        // 2. Major Grid
        response.put("major_grid", repository.findBySection("major_grid"));

        // 3. Video Gallery
        response.put("video_gallery", repository.findBySection("video_gallery"));

        return response;
    }

    public SportData save(SportData data) { return repository.save(data); }
    public Optional<SportData> getById(String id) { return repository.findById(id); }
    public void delete(String id) { repository.deleteById(id); }
}