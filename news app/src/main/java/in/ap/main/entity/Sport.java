package in.ap.main.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Version;

@Entity
public class Sport {

    @Id
    // @GeneratedValue हटा दिया क्योंकि आप अपनी ID (SP123...) खुद भेज रहे हैं
    private String id; 

    @Version
    private int version; // Integer की जगह primitive 'int' ताकि default 0 रहे

    private String cover;
    private String title;
    private String category; 
    private String date;
    private int comments;
    private String content;

    public Sport() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public int getVersion() { return version; }
    public void setVersion(int version) { this.version = version; }

    public String getCover() { return cover; }
    public void setCover(String cover) { this.cover = cover; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public int getComments() { return comments; }
    public void setComments(int comments) { this.comments = comments; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}