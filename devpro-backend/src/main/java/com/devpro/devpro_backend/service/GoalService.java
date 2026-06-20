package com.devpro.devpro_backend.service;
import com.devpro.devpro_backend.entity.Goal;
import com.devpro.devpro_backend.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {
    @Autowired
    private GoalRepository goalRepository;

    public Goal addGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }
}
