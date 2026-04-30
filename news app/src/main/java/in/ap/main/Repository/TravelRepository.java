package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.ap.main.entity.Travel;

public interface TravelRepository extends JpaRepository<Travel, String> {
}