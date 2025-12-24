package com.example.schoolmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Studentdto {
     private Integer studentId;

     private String firstName;

     private String lastName;

     @JsonProperty("classes")
     private Classdto classdto;

     @JsonProperty("details")
     private StudentDetailsdto studentDetailsdto;

    public Studentdto(Integer studentId, String firstName, String lastName) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Studentdto(Integer studentId, String firstName, String lastName, Classdto classdto,
                      StudentDetailsdto studentDetailsdto) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.classdto = classdto;
        this.studentDetailsdto = studentDetailsdto;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
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

    public Classdto getClassdto() {
        return classdto;
    }

    public void setClassdto(Classdto classdto) {
        this.classdto = classdto;
    }
}
