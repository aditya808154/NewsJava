package in.ap.main.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class SidebarArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // Layout Sections: "main_article", "recent_sidebar", "category_sidebar", "ad_sidebar"
    private String section;

    private String title;
    private String date;
    private String time;
    private String readTime;
    private String featuredImage;

    @Column(columnDefinition = "LONGTEXT")
    private String content; // HTML Content with <img> tags support

    @ElementCollection
    private List<String> tags;

    // Sidebar Specific Fields
    private String sidebarImageUrl; // Widget thumbnails ke liye
    private String categoryName;
    private Integer categoryCount;
    
    @ElementCollection
    private List<String> popularTags;

    // Ad/Promotion fields
    private String adImageUrl;
    private String adText;
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
	public String getFeaturedImage() {
		return featuredImage;
	}
	public void setFeaturedImage(String featuredImage) {
		this.featuredImage = featuredImage;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public List<String> getTags() {
		return tags;
	}
	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	public String getSidebarImageUrl() {
		return sidebarImageUrl;
	}
	public void setSidebarImageUrl(String sidebarImageUrl) {
		this.sidebarImageUrl = sidebarImageUrl;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Integer getCategoryCount() {
		return categoryCount;
	}
	public void setCategoryCount(Integer categoryCount) {
		this.categoryCount = categoryCount;
	}
	public List<String> getPopularTags() {
		return popularTags;
	}
	public void setPopularTags(List<String> popularTags) {
		this.popularTags = popularTags;
	}
	public String getAdImageUrl() {
		return adImageUrl;
	}
	public void setAdImageUrl(String adImageUrl) {
		this.adImageUrl = adImageUrl;
	}
	public String getAdText() {
		return adText;
	}
	public void setAdText(String adText) {
		this.adText = adText;
	}
    
}