package in.ap.main.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class GalleryPost {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String section; // "main_post", "recent_posts", "category_list"
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    // Gallery ke multiple images ke liye
    @ElementCollection
    @CollectionTable(name = "post_gallery_images", joinColumns = @JoinColumn(name = "post_id"))
    private List<String> galleryImages;

    // Post details
    @ElementCollection
    private List<String> tags;
    private String date;
    private String time;
    private String readTime;
    private Integer commentsCount;

    // Sidebar fields
    private String imageUrl; // Recent posts ke liye
    private String categoryName;
    private Integer count;
    private String bg;
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
	public List<String> getGalleryImages() {
		return galleryImages;
	}
	public void setGalleryImages(List<String> galleryImages) {
		this.galleryImages = galleryImages;
	}
	public List<String> getTags() {
		return tags;
	}
	public void setTags(List<String> tags) {
		this.tags = tags;
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
	public Integer getCommentsCount() {
		return commentsCount;
	}
	public void setCommentsCount(Integer commentsCount) {
		this.commentsCount = commentsCount;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
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
	public String getBg() {
		return bg;
	}
	public void setBg(String bg) {
		this.bg = bg;
	}
    
    
    
}