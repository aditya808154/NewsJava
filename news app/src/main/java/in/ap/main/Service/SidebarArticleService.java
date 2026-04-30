package in.ap.main.Service;

import in.ap.main.Repository.SidebarArticleRepository;
import in.ap.main.entity.SidebarArticle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class SidebarArticleService {

    @Autowired
    private SidebarArticleRepository repository;

    public Map<String, Object> getArticleLayout() {
        Map<String, Object> response = new HashMap<>();

        // 1. Sare Main Articles ki list (Multiple data ke liye)
        List<SidebarArticle> mainArticles = repository.findBySection("main_article");
        response.put("main_articles", mainArticles);

        // 2. Sidebar Data
        Map<String, Object> sidebar = new HashMap<>();
        
        // Recent posts ki list
        sidebar.put("recentPosts", repository.findBySection("recent_sidebar"));
        
        // Categories ki list
        sidebar.put("categories", repository.findBySection("category_sidebar"));
        
        // Popular Tags (Hum pehle main article se tags nikal rahe hain)
        if (!mainArticles.isEmpty()) {
            sidebar.put("popularTags", mainArticles.get(0).getPopularTags());
        } else {
            sidebar.put("popularTags", new ArrayList<>());
        }

        response.put("sidebar", sidebar);
        return response;
    }

    public SidebarArticle save(SidebarArticle data) { return repository.save(data); }
    public Optional<SidebarArticle> getById(String id) { return repository.findById(id); }
    public void delete(String id) { repository.deleteById(id); }
}