package in.ap.main.Repository;

import in.ap.main.entity.CategoryOne;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryOneRepository extends JpaRepository<CategoryOne, String> {
    List<CategoryOne> findBySection(String section);
}