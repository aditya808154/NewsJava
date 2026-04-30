package in.ap.main.entity;

import jakarta.persistence.*;

@Entity
public class HomeNews {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    @Column(columnDefinition = "TEXT") // Summary badi ho sakti hai
    private String summary;

    private String time;
    private String cat;
    private String img;

    public HomeNews() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getCat() { return cat; }
    public void setCat(String cat) { this.cat = cat; }
    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }
}