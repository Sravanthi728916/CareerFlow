package com.devpro.devpro_backend.repository;

import com.devpro.devpro_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    long countByCompletedTrue();

}