package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.ap.main.entity.Earth;

public interface EarthRepository extends JpaRepository<Earth, String> {
}