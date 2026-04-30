package in.ap.main.entity;

import jakarta.persistence.*;

@Entity
public class Innovation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String cover;
    private String title;
    private String catgeory; // Aapke frontend spelling ke hisaab se
    private String date;
    private int comments;

    @Column(columnDefinition = "TEXT")
    private String content;

    // Constructors
    public Innovation() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCover() { return cover; }
    public void setCover(String cover) { this.cover = cover; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCatgeory() { return catgeory; }
    public void setCatgeory(String catgeory) { this.catgeory = catgeory; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public int getComments() { return comments; }
    public void setComments(int comments) { this.comments = comments; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}