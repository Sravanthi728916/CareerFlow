package com.devpro.devpro_backend.service;
import com.devpro.devpro_backend.entity.Task;
import com.devpro.devpro_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task markCompleted(Long id) {

        Task task =
                taskRepository.findById(id).orElse(null);

        if (task != null) {
            task.setCompleted(true);
            return taskRepository.save(task);
        }

        return null;
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
