package in.ap.main.Controller;

import in.ap.main.Service.BusinessDataService;
import in.ap.main.entity.BusinessData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/business-data")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class BusinessDataController {

    @Autowired
    private BusinessDataService service;

    // 1. READ: Frontend ke liye layout data
    @GetMapping("/layout")
    public ResponseEntity<Map<String, Object>> getLayout() {
        return ResponseEntity.ok(service.getCompleteBusinessLayout());
    }

    // 2. CREATE: Naya data add karne ke liye
    @PostMapping("/add")
    public ResponseEntity<BusinessData> save(@RequestBody BusinessData data) {
        return ResponseEntity.ok(service.saveBusinessItem(data));
    }

    // 3. UPDATE: Purana data badalne ke liye (Ye raha update logic)
    @PutMapping("/update/{id}")
    public ResponseEntity<BusinessData> update(@PathVariable String id, @RequestBody BusinessData newData) {
        return service.getBusinessItemById(id).map(existingData -> {
            // Fields ko update karna
            existingData.setTitle(newData.getTitle());
            existingData.setSummary(newData.getSummary());
            existingData.setCategory(newData.getCategory());
            existingData.setImageUrl(newData.getImageUrl());
            existingData.setSection(newData.getSection());
            existingData.setDate(newData.getDate());
            existingData.setTime(newData.getTime());
            existingData.setAuthor(newData.getAuthor());
            existingData.setCount(newData.getCount());

            BusinessData updatedObj = service.saveBusinessItem(existingData);
            return ResponseEntity.ok(updatedObj);
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. DELETE: Item hatane ke liye
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        service.deleteBusinessItem(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}