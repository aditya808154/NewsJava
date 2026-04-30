package in.ap.main.Repository;

import in.ap.main.entity.StandardPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StandardPostRepository extends JpaRepository<StandardPost, String> {
    List<StandardPost> findBySection(String section);
}