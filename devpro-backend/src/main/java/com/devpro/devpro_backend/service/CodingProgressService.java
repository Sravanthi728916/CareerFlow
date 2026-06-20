package com.devpro.devpro_backend.service;
import com.devpro.devpro_backend.entity.CodingProgress;
import com.devpro.devpro_backend.repository.CodingProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodingProgressService {
    @Autowired
    private CodingProgressRepository repository;

    public CodingProgress save(CodingProgress progress) {
        return repository.save(progress);
    }

    public List<CodingProgress> getAll() {
        return repository.findAll();
    }

}

