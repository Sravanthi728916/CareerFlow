package com.devpro.devpro_backend.controller;
import com.devpro.devpro_backend.dto.AnalyticsResponse;
import com.devpro.devpro_backend.repository.GoalRepository;
import com.devpro.devpro_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private GoalRepository goalRepository;

    @GetMapping
    public AnalyticsResponse getAnalytics() {

        AnalyticsResponse response = new AnalyticsResponse();

        long tasks = taskRepository.count();
        long goals = goalRepository.count();

        response.setTasksDone(tasks);
        response.setTotalGoals(goals);
        response.setActiveDays(18);
        response.setFocusTime(48);

        int completionRate =
                goals == 0 ? 0 : (int)((tasks * 100) / goals);

        response.setCompletionRate(completionRate);

        return response;
    }
}