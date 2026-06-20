package com.devpro.devpro_backend.controller;
import com.devpro.devpro_backend.entity.CalendarEvent;
import com.devpro.devpro_backend.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin("*")
public class CalendarController {
    @Autowired
    private CalendarService calendarService;

    @PostMapping
    public CalendarEvent addEvent(
            @RequestBody CalendarEvent event) {

        return calendarService.saveEvent(event);
    }

    @GetMapping
    public List<CalendarEvent> getEvents() {

        return calendarService.getAllEvents();
    }

    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {

        calendarService.deleteEvent(id);
        return "Event Deleted";
    }
}

