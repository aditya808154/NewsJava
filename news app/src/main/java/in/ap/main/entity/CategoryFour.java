package in.ap.main.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CategoryFour {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String section; 
    private String category;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private String imageUrl;
    private String date;
    private String time;
    private String author;

    @Column(name = "created_at")
    private Long createdAt;

    // Isse naya data add hote hi automatic current time save ho jayega
    @PrePersist
    protected void onCreate() {
        this.createdAt = System.currentTimeMillis();
    }

    public CategoryFour() {}

    // Getters and Setters (Manual for safety)
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
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public Long getCreatedAt() { return createdAt; }
    public void setCreatedAt(Long createdAt) { this.createdAt = createdAt; }
}