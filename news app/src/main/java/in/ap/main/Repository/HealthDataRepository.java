package in.ap.main.Repository;

import in.ap.main.entity.HealthData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HealthDataRepository extends JpaRepository<HealthData, String> {
    List<HealthData> findBySection(String section);
}