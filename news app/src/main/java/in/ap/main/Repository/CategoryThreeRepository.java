package in.ap.main.Repository;

import in.ap.main.entity.CategoryThree;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryThreeRepository extends JpaRepository<CategoryThree, String> {
	List<CategoryThree> findBySection(String section);
}