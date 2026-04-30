package in.ap.main.entity;

import jakarta.persistence.*;

@Entity
public class LiveArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String category;
    private String title;
    private String time; 
    private String thumbnail;
    
    // Naye fields video ke liye
    private String mediaType; // Isme "video" ya "image" save karein
    private String videoUrl;  // Isme YouTube ka embed link ya video link save karein

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String fullContent;

    private boolean isBreaking;

    public LiveArticle() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }

    public String getMediaType() { return mediaType; }
    public void setMediaType(String mediaType) { this.mediaType = mediaType; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getFullContent() { return fullContent; }
    public void setFullContent(String fullContent) { this.fullContent = fullContent; }

    public boolean isIsBreaking() { return isBreaking; }
    public void setIsBreaking(boolean breaking) { isBreaking = breaking; }
}