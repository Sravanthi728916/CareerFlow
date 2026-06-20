package com.devpro.devpro_backend.service;
import com.devpro.devpro_backend.entity.JobApplication;
import com.devpro.devpro_backend.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {
    @Autowired
    private JobApplicationRepository repository;

    public JobApplication add(JobApplication application) {
        return repository.save(application);
    }

    public List<JobApplication> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
