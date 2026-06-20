package com.devpro.devpro_backend.service;
import com.devpro.devpro_backend.entity.Profile;
import com.devpro.devpro_backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

        @Autowired
        private ProfileRepository profileRepository;

        public Profile saveProfile(Profile profile) {
            return profileRepository.save(profile);
        }

        public Profile getProfile(Long id) {
            Optional<Profile> profile = profileRepository.findById(id);
            return profile.orElse(null);
        }

        public Profile updateProfile(Long id, Profile updatedProfile) {
            return profileRepository.findById(id).map(profile -> {
                profile.setFullName(updatedProfile.getFullName());
                profile.setEmail(updatedProfile.getEmail());

                profile.setBio(updatedProfile.getBio());
                return profileRepository.save(profile);
            }).orElse(null);
        }

        public void deleteProfile(Long id) {
            profileRepository.deleteById(id);
        }

}
