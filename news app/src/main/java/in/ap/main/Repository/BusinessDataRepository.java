package in.ap.main.Repository;

import in.ap.main.entity.BusinessData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BusinessDataRepository extends JpaRepository<BusinessData, String> {
    List<BusinessData> findBySection(String section);
    List<BusinessData> findBySectionOrderByDateDesc(String section);
}