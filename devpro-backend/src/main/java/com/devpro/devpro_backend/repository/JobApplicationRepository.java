package com.devpro.devpro_backend.repository;
import com.devpro.devpro_backend.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
public interface JobApplicationRepository   extends JpaRepository<JobApplication, Long> {

}
