package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.ap.main.entity.LiveArticle;

public interface LiveArticleRepository extends JpaRepository<LiveArticle, String> {
}