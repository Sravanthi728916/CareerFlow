package com.devpro.devpro_backend.dto;

public class AnalyticsResponse {
        private long tasksDone;
        private long totalGoals;
        private long activeDays;
        private int completionRate;
        private int focusTime;

        public AnalyticsResponse() {}

        public long getTasksDone() {
            return tasksDone;
        }

        public void setTasksDone(long tasksDone) {
            this.tasksDone = tasksDone;
        }

        public long getTotalGoals() {
            return totalGoals;
        }

        public void setTotalGoals(long totalGoals) {
            this.totalGoals = totalGoals;
        }

        public long getActiveDays() {
            return activeDays;
        }

        public void setActiveDays(long activeDays) {
            this.activeDays = activeDays;
        }

        public int getCompletionRate() {
            return completionRate;
        }

        public void setCompletionRate(int completionRate) {
            this.completionRate = completionRate;
        }

        public int getFocusTime() {
            return focusTime;
        }

        public void setFocusTime(int focusTime) {
            this.focusTime = focusTime;
        }}

