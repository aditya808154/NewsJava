package in.ap.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.ap.main.entity.NewsPub;

public interface NewsPubRepository extends JpaRepository<NewsPub, String> {

}
