package in.ap.main.Repository;

import in.ap.main.entity.SportData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SportDataRepository extends JpaRepository<SportData, String> {
    List<SportData> findBySection(String section);
}