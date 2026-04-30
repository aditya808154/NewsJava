package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.ap.main.entity.Sport;
import java.util.List;

public interface SportRepository extends JpaRepository<Sport, String> {
	List<Sport> findByCategoryIgnoreCase(String category);
}