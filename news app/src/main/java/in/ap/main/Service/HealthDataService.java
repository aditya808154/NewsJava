package in.ap.main.Service;

import in.ap.main.Repository.HealthDataRepository;
import in.ap.main.entity.HealthData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class HealthDataService {

	@Autowired
	private HealthDataRepository repository;

	public Map<String, Object> getHealthFullLayout() {
		Map<String, Object> response = new HashMap<>();

		// React component ke structure ke hisab se mapping
		response.put("lead_stories", repository.findBySection("lead_stories"));
		response.put("grid_stories", repository.findBySection("grid_stories"));
		response.put("mini_stories", repository.findBySection("mini_stories"));

		return response;
	}

	public HealthData save(HealthData data) {
		return repository.save(data);
	}

	public Optional<HealthData> getById(String id) {
		return repository.findById(id);
	}

	public void delete(String id) {
		repository.deleteById(id);
	}
}