package in.ap.main.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class VideoPost {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	// Layout Section: "main_series", "recent_videos", "category_list"
	private String section;

	private String baseTitle;
	private String date;
	private String time;
	private String readTime;

	// Sidebar & Common Fields
	private String imageUrl; // Recent posts thumbnail ya sidebar ke liye
	private String videoId; // YouTube Link sidebar ke liye
	private String categoryName;
	private Integer count;

	// List fields (Single table me handle karne ke liye ElementCollection)
	@ElementCollection
	private List<String> popularTags;

	// Series Videos ka data (JSON string ki tarah save hoga)
	@Column(columnDefinition = "LONGTEXT")
	private String videoListData;

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

	public String getVideoId() {
		return videoId;
	}

	public void setVideoId(String videoId) {
		this.videoId = videoId;
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

	public String getVideoListData() {
		return videoListData;
	}

	public void setVideoListData(String videoListData) {
		this.videoListData = videoListData;
	}

}