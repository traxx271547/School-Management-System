package com.example.schoolmanagementsystem.dto;

import java.util.Set;

public class Classdto {
    private Integer classId;
    private String section;
    private Set<String> subjects;

    public Classdto() {
    }

    public Classdto(Integer classId, String section, Set<String> subjects) {
        this.classId = classId;
        this.section = section;
        this.subjects = subjects;
    }

    public Integer getClassId() {
        return classId;
    }

    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public Set<String> getSubjects() {
        return subjects;
    }

    public void setSubjects(Set<String> subjects) {
        this.subjects = subjects;
    }
}
