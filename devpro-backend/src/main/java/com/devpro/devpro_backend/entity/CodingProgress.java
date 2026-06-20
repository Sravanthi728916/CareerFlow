package com.devpro.devpro_backend.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "coding_progress")
public class CodingProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer leetcodeSolved;

    private Integer codechefRating;

    private Integer githubRepositories;

    private Double codingHours;

    public CodingProgress() {
    }

    public Long getId() {
        return id;
    }

    public Integer getLeetcodeSolved() {
        return leetcodeSolved;
    }

    public void setLeetcodeSolved(Integer leetcodeSolved) {
        this.leetcodeSolved = leetcodeSolved;
    }

    public Integer getCodechefRating() {
        return codechefRating;
    }

    public void setCodechefRating(Integer codechefRating) {
        this.codechefRating = codechefRating;
    }

    public Integer getGithubRepositories() {
        return githubRepositories;
    }

    public void setGithubRepositories(Integer githubRepositories) {
        this.githubRepositories = githubRepositories;
    }

    public Double getCodingHours() {
        return codingHours;
    }

    public void setCodingHours(Double codingHours) {
        this.codingHours = codingHours;
    }
}
