package in.ap.main.Repository;

import in.ap.main.entity.CategoryFour;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryFourRepository extends JpaRepository<CategoryFour, String> {
    // Latest first lane ke liye created_at desc use karein
    List<CategoryFour> findBySectionOrderByCreatedAtDesc(String section);
}