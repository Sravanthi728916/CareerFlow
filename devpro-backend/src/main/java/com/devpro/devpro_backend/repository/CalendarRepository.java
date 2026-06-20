package com.devpro.devpro_backend.repository;
import com.devpro.devpro_backend.entity.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CalendarRepository  extends JpaRepository<CalendarEvent, Long>{
}
