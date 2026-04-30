package in.ap.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import in.ap.main.Repository.VideoRepository;
import in.ap.main.entity.Video;
import java.util.List;
import java.util.Optional;

@Service
public class VideoService {

    @Autowired
    private VideoRepository repository;

    public Video saveVideo(Video video) {
        return repository.save(video);
    }

    public List<Video> getAllVideos() {
        return repository.findAll();
    }

    public Optional<Video> getById(String id) {
        return repository.findById(id);
    }

    public void deleteVideo(String id) {
        repository.deleteById(id);
    }
}