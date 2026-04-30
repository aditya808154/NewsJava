package in.ap.main.entity;

import jakarta.persistence.*;

@Entity
public class CategoryDefault {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // Isme save hoga: "feature", "sidebar", "sport", "manoranjan", ya "game"
    private String section;  

    private String category;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private String imageUrl;
    private String time;
    private String date;
    private String type;     // video or image
    private String mediaUrl; // YouTube ya MP4 link
    private Integer comments;

    public CategoryDefault() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getMediaUrl() { return mediaUrl; }
    public void setMediaUrl(String mediaUrl) { this.mediaUrl = mediaUrl; }
    public Integer getComments() { return comments; }
    public void setComments(Integer comments) { this.comments = comments; }
}