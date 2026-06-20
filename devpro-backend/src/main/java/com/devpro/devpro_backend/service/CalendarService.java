package com.devpro.devpro_backend.service;
import com.devpro.devpro_backend.entity.CalendarEvent;
import com.devpro.devpro_backend.repository.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarService {
    @Autowired
    private CalendarRepository calendarRepository;

    public CalendarEvent saveEvent(CalendarEvent event) {
        return calendarRepository.save(event);
    }

    public List<CalendarEvent> getAllEvents() {
        return calendarRepository.findAll();
    }

    public void deleteEvent(Long id) {
        calendarRepository.deleteById(id);
    }
}

