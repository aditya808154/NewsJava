package in.ap.main.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "sport_data")
public class SportData {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	private String section; // "focus_story", "major_grid", "video_gallery"
	private String category;
	private String title;

	@Column(columnDefinition = "LONGTEXT")
	private String summary;

	private String imageUrl;
	private String time;
	private String type; // "Image" ya "Video"
	private String videoUrl; // YouTube embed link ya local video path

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

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

}