package com.devpro.devpro_backend.service;
import com.devpro.devpro_backend.entity.Resume;
import com.devpro.devpro_backend.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {
    @Autowired
    private ResumeRepository repository;

    public Resume save(Resume resume) {
        return repository.save(resume);
    }

    public List<Resume> getAll() {
        return repository.findAll();
    }


}
