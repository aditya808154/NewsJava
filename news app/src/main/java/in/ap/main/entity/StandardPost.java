package in.ap.main.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class StandardPost {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String section; // "main_post", "recent_posts", "category_list"
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String content; // HTML content support karega

    private String mainImage;
    private String gridImage;
    private String date;
    private String time;
    private String readTime;
    
    @ElementCollection
    private List<String> tags; // Post ke niche dikhne wale tags

    // Sidebar Category Fields
    private String categoryName;
    private Integer count;
    private String bgImage;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getMainImage() {
		return mainImage;
	}
	public void setMainImage(String mainImage) {
		this.mainImage = mainImage;
	}
	public String getGridImage() {
		return gridImage;
	}
	public void setGridImage(String gridImage) {
		this.gridImage = gridImage;
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
	public String getReadTime() {
		return readTime;
	}
	public void setReadTime(String readTime) {
		this.readTime = readTime;
	}
	public List<String> getTags() {
		return tags;
	}
	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String getBgImage() {
		return bgImage;
	}
	public void setBgImage(String bgImage) {
		this.bgImage = bgImage;
	}
    
    
}