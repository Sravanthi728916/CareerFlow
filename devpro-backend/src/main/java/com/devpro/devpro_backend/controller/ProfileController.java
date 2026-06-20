package com.devpro.devpro_backend.controller;
import com.devpro.devpro_backend.entity.Profile;
import com.devpro.devpro_backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    // CREATE PROFILE
    @PostMapping
    public Profile saveProfile(@RequestBody Profile profile) {
        return profileService.saveProfile(profile);
    }

    // GET PROFILE BY ID
    @GetMapping("/{id}")
    public Profile getProfile(@PathVariable Long id) {
        return profileService.getProfile(id);
    }

    // UPDATE PROFILE
    @PutMapping("/{id}")
    public Profile updateProfile(@PathVariable Long id,
                                 @RequestBody Profile profile) {
        return profileService.updateProfile(id, profile);
    }

    // DELETE PROFILE
    @DeleteMapping("/{id}")
    public String deleteProfile(@PathVariable Long id) {
        profileService.deleteProfile(id);
        return "Profile deleted successfully with id: " + id;
    }
}