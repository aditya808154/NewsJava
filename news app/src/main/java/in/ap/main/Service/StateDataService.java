package in.ap.main.Service;

import in.ap.main.Repository.StateDataRepository;
import in.ap.main.entity.StateData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class StateDataService {

    @Autowired
    private StateDataRepository repository;

    public Map<String, Object> getStateFullLayout() {
        Map<String, Object> response = new HashMap<>();

        // 1. Sidebar Data
        Map<String, Object> sidebarData = new HashMap<>();
        sidebarData.put("recent_posts", repository.findBySection("recent_posts"));
        sidebarData.put("hot_categories", repository.findBySection("hot_category"));

        // 2. News Data (Yahan FIX kiya hai)
        Map<String, Object> stateNewsData = new HashMap<>();
        // Ab feature get(0) nahi, poori list bhejega
        stateNewsData.put("feature", repository.findBySection("feature")); 
        stateNewsData.put("grid_posts", repository.findBySection("grid_posts"));

        // 3. Mock States
        response.put("sidebarData", sidebarData);
        response.put("stateNewsData", stateNewsData);
        response.put("mockStates", repository.findBySection("mock_states"));

        return response;
    }

    public StateData save(StateData data) { return repository.save(data); }
    public Optional<StateData> getById(String id) { return repository.findById(id); }
    public void delete(String id) { repository.deleteById(id); }
}