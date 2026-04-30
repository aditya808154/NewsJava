package in.ap.main.Repository;

import in.ap.main.entity.CategoryTwo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryTwoRepository extends JpaRepository<CategoryTwo, String> {
    List<CategoryTwo> findBySection(String section);
}