package in.ap.main.Controller;

import in.ap.main.Service.StandardPostService;
import in.ap.main.entity.StandardPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/post-details")
public class StandardPostController {

	@Autowired
	private StandardPostService service;

	@GetMapping("/layout")
	public ResponseEntity<Map<String, Object>> getLayout() {
		return ResponseEntity.ok(service.getPostLayout());
	}

	@PostMapping("/add")
	public StandardPost add(@RequestBody StandardPost post) {
		return service.save(post);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<StandardPost> update(@PathVariable String id, @RequestBody StandardPost newData) {
		return service.getById(id).map(post -> {
			post.setTitle(newData.getTitle());
			post.setContent(newData.getContent());
			post.setMainImage(newData.getMainImage());
			post.setGridImage(newData.getGridImage());
			post.setTags(newData.getTags());
			post.setSection(newData.getSection());
			post.setCategoryName(newData.getCategoryName());
			post.setBgImage(newData.getBgImage());
			post.setCount(newData.getCount());
			return ResponseEntity.ok(service.save(post));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return "Post deleted: " + id;
	}
}