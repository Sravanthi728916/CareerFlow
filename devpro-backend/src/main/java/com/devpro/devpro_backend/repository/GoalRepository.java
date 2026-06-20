package com.devpro.devpro_backend.repository;
import com.devpro.devpro_backend.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository  extends JpaRepository<Goal,Long>{
}
