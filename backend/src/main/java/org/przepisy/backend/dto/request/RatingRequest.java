package org.przepisy.backend.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class RatingRequest {
    @NotNull(message = "Rating value is required")
    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private Integer value;

    // Constructors
    public RatingRequest() {}

    public RatingRequest(Integer value) {
        this.value = value;
    }

    // Getters and Setters
    public Integer getValue() { return value; }
    public void setValue(Integer value) { this.value = value; }
}