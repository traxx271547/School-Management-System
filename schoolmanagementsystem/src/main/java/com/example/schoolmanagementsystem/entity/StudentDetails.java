package com.example.schoolmanagementsystem.entity;

import jakarta.persistence.*;
@Entity
@Table(name="student_details")
public class StudentDetails {

    @Id
    private Integer studentId;

    @OneToOne
    @MapsId
    @JoinColumn(name="student_id")
    private Student student;


    @Column(name="address")
    private String address;

    @Column(name="mobile_number")
    private String mobileNumber;

    @Column(name="mother_name")
    private String motherName;

    @Column(name="father_name")
    private String fatherName;

    public StudentDetails() {
    }

    public StudentDetails(String address, String mobileNumber, String motherName, String fatherName) {

        this.student = student;
        this.address = address;
        this.mobileNumber = mobileNumber;
        this.motherName = motherName;
        this.fatherName = fatherName;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }
}
