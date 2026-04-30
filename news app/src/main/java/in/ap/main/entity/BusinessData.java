package in.ap.main.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class BusinessData {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String section; // "feature", "grid_posts", "recent_posts", "hot_category"
    private String category;
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String summary;

    private String imageUrl;
    private String date;
    private String time;
    private String author;
    
    // Sirf Hot Category ke liye count
    private Integer count;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
    
    
    
}