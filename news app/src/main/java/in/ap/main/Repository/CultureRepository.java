package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.ap.main.entity.Culture;

public interface CultureRepository extends JpaRepository<Culture, String> {
}