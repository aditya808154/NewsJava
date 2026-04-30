package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.ap.main.entity.Innovation;

public interface InnovationRepository extends JpaRepository<Innovation, String> {
}