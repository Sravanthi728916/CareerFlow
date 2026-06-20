package com.devpro.devpro_backend.service;

import com.devpro.devpro_backend.dto.DashboardResponse;
import com.devpro.devpro_backend.entity.Goal;
import com.devpro.devpro_backend.repository.GoalRepository;
import com.devpro.devpro_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private TaskRepository taskRepository;

    public DashboardResponse getDashboard() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalGoals(goalRepository.count());
        response.setTotalTasks(taskRepository.count());

        response.setCompletedTasks(
                taskRepository.countByCompletedTrue()
        );

        List<Goal> goals = goalRepository.findAll();

        int totalProgress = 0;
        int count = 0;

        for (Goal goal : goals) {

            if (goal.getProgress() != null) {

                totalProgress += goal.getProgress();
                count++;
            }
        }

        if (count > 0) {
            response.setGoalProgress(totalProgress / count);
        } else {
            response.setGoalProgress(0);
        }

        response.setCurrentStreak(0);

        response.setTotalApplications(0);
        response.setTotalResumes(0);
        response.setTotalCodingEntries(0);

        return response;
    }
}