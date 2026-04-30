package in.ap.main.Repository;

import in.ap.main.entity.StateData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StateDataRepository extends JpaRepository<StateData, String> {
    List<StateData> findBySection(String section);
}