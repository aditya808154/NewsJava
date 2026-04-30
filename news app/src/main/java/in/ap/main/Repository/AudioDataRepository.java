package in.ap.main.Repository;

import in.ap.main.entity.AudioData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AudioDataRepository extends JpaRepository<AudioData, String> {
    List<AudioData> findBySection(String section);
}