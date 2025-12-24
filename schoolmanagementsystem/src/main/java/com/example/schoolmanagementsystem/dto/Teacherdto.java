package com.example.schoolmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Teacherdto {
    private Integer teacherId;

    private String firstName;

    private String lastName;

    @JsonProperty("students")
    private List<Studentdto> students;

    @JsonProperty("classes")
    private List<Classdto> classes;

    @JsonProperty("details")
    private TeacherDetailsdto teacherDetailsdto;

    public Teacherdto() {
    }

    public Teacherdto(Integer teacherId, String firstName, String lastName) {
        this.teacherId = teacherId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Teacherdto(Integer teacherId, String firstName, String lastName,
                      List<Studentdto> students,List<Classdto> classes, TeacherDetailsdto teacherDetailsdto) {
        this.teacherId = teacherId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.students = students;
        this.classes = classes;
        this.teacherDetailsdto = teacherDetailsdto;
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

    public List<Classdto> getClasses() {
        return classes;
    }

    public void setClasses(List<Classdto> classes) {
        this.classes = classes;
    }

    public TeacherDetailsdto getTeacherDetailsdto() {
        return teacherDetailsdto;
    }

    public void setTeacherDetailsdto(TeacherDetailsdto teacherDetailsdto) {
        this.teacherDetailsdto = teacherDetailsdto;
    }
}
