package in.ap.main.Repository;

import in.ap.main.entity.ExploreNews;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExploreRepository extends JpaRepository<ExploreNews, String> {
}