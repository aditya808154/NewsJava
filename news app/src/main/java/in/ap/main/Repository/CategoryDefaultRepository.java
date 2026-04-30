package in.ap.main.Repository;

import in.ap.main.entity.CategoryDefault;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryDefaultRepository extends JpaRepository<CategoryDefault, String> {
    List<CategoryDefault> findBySection(String section);
}