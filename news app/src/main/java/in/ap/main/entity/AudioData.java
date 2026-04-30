package in.ap.main.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class AudioData {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String section; // "main_podcast", "recent_posts", "category_list"
    private String baseTitle;
    private String date;
    private String time;
    private String readTime;

    // Sidebar fields
    private String imageUrl; 
    private String categoryName;
    private Integer count;

    @ElementCollection
    private List<String> popularTags;

    // Audio list items (JSON String format)
    @Column(columnDefinition = "LONGTEXT")
    private String audioListData;

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

	public String getBaseTitle() {
		return baseTitle;
	}

	public void setBaseTitle(String baseTitle) {
		this.baseTitle = baseTitle;
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

	public List<String> getPopularTags() {
		return popularTags;
	}

	public void setPopularTags(List<String> popularTags) {
		this.popularTags = popularTags;
	}

	public String getAudioListData() {
		return audioListData;
	}

	public void setAudioListData(String audioListData) {
		this.audioListData = audioListData;
	} 
    
    
}