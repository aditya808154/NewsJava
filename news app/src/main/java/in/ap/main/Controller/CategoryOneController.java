package in.ap.main.Controller;

import in.ap.main.Service.CategoryOneService;
import in.ap.main.entity.CategoryOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/category-one")
public class CategoryOneController {

    @Autowired
    private CategoryOneService service;

    // 1. Add News
    @PostMapping("/add")
    public CategoryOne add(@RequestBody CategoryOne news) {
        return service.saveNews(news);
    }

    // 2. Get Structured Data for CategoryOneData.js
    @GetMapping("/layout")
    public Map<String, Object> getLayout() {
        return service.getCategoryOneLayout();
    }

    // 3. Delete News
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id) {
        service.deleteNews(id);
        return "CategoryOne News deleted!";
    }
}