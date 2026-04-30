package in.ap.main.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class NewsPub {

    @Id
    private String id; // primary key

    private String cover;
    private String title;
    private String category; // fixed typo
    private String date;
    private int comments;
    private String content;

    public NewsPub() {}

    public NewsPub(String id, String cover, String title, String category, String date, int comments, String content) {
        this.id = id;
        this.cover = cover;
        this.title = title;
        this.category = category;
        this.date = date;
        this.comments = comments;
        this.content = content;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
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
