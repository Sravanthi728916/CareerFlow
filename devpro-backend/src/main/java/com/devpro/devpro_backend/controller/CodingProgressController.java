package com.devpro.devpro_backend.controller;

import com.devpro.devpro_backend.entity.CodingProgress;
import com.devpro.devpro_backend.service.CodingProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin("*")
public class CodingProgressController {
    @Autowired
        private CodingProgressService service;

        @PostMapping
        public CodingProgress save(
                @RequestBody CodingProgress progress) {

            return service.save(progress);
        }

        @GetMapping
        public List<CodingProgress> getAll() {
            return service.getAll();
        }

}
