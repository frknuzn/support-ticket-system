package com.example.support.support_ticket_system_backend.enums;

public enum Status {
    OPEN("Open"),
    ANSWERED("Answered"),
    CLOSED("Closed");

    private final String displayName;

    Status(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
