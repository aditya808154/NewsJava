package in.ap.main.entity;

import jakarta.persistence.*;

@Entity
public class ExploreNews {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String heading;

    @Column(columnDefinition = "TEXT")
    private String summary; // Aapka main content yahan save hoga

    private String time;
    private String region;
    private String imageUrl;

    public ExploreNews() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getHeading() { return heading; }
    public void setHeading(String heading) { this.heading = heading; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}