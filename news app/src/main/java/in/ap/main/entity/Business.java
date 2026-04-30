package in.ap.main.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "business_news")
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Automatic ID generate karega
    private String id;

    private String cover;
    private String title;
    private String category;
    private String date;
    private int comments;

    @Column(columnDefinition = "TEXT") // Bada content (Hindi/English) store karne ke liye
    private String content;

    // Constructors
    public Business() {}

    // Getters and Setters
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