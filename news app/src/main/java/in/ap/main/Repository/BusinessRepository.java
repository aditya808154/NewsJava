package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import in.ap.main.entity.Business;

@Repository
public interface BusinessRepository extends JpaRepository<Business, String> {
}