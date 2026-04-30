package in.ap.main.entity;

import jakarta.persistence.*;

@Entity
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String category;
    private String title;
    private String date;
    private int comments;
    private String thumbnail; // Image URL ke liye
    private String videoUrl;  // YouTube embed URL ke liye

    @Column(columnDefinition = "TEXT")
    private String description;

    public Video() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public int getComments() { return comments; }
    public void setComments(int comments) { this.comments = comments; }
    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}