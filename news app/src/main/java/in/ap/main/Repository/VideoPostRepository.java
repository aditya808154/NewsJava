package in.ap.main.Repository;

import in.ap.main.entity.VideoPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VideoPostRepository extends JpaRepository<VideoPost, String> {
    List<VideoPost> findBySection(String section);
}