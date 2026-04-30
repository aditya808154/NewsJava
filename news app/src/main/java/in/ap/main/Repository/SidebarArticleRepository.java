package in.ap.main.Repository;

import in.ap.main.entity.SidebarArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SidebarArticleRepository extends JpaRepository<SidebarArticle, String> {
    List<SidebarArticle> findBySection(String section);
}