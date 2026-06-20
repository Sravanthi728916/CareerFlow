package com.devpro.devpro_backend.service;
import com.devpro.devpro_backend.dto.GithubProfileResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GithubService {
    public GithubProfileResponse getProfile(String username) {

        String url =
                "https://api.github.com/users/" + username;

        RestTemplate restTemplate =
                new RestTemplate();

        Map<String, Object> response =
                restTemplate.getForObject(url, Map.class);

        GithubProfileResponse profile =
                new GithubProfileResponse();

        profile.setUsername(
                (String) response.get("login"));

        profile.setName(
                (String) response.get("name"));

        profile.setPublicRepos(
                ((Number) response.get("public_repos")).intValue());

        profile.setFollowers(
                ((Number) response.get("followers")).intValue());

        profile.setFollowing(
                ((Number) response.get("following")).intValue());

        profile.setProfileUrl(
                (String) response.get("html_url"));

        return profile;
    }

}
