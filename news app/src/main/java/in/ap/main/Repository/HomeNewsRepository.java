package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.ap.main.entity.HomeNews;

public interface HomeNewsRepository extends JpaRepository<HomeNews, String> {
}