package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.ap.main.entity.Video;

public interface VideoRepository extends JpaRepository<Video, String> {
}