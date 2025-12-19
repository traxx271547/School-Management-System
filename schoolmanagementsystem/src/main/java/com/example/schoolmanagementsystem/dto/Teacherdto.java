package com.example.schoolmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Teacherdto {
    private Integer teacherId;

    private String firstName;

    private String lastName;

    @JsonProperty("students")
    private List<Studentdto> students;

    public Teacherdto() {
    }

    public Teacherdto(Integer teacherId, String firstName, String lastName) {
        this.teacherId = teacherId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Teacherdto(Integer teacherId, String firstName, String lastName, List<Studentdto> students) {
        this.teacherId = teacherId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.students = students;
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<Studentdto> getStudentdto() {
        return students;
    }

    public void setStudentdto(List<Studentdto> studentdto) {
        this.students = studentdto;
    }
}
