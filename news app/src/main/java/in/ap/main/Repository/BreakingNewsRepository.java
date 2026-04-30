package in.ap.main.Repository;

import in.ap.main.entity.BreakingNews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreakingNewsRepository extends JpaRepository<BreakingNews, String> {
}