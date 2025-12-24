package com.example.schoolmanagementsystem.dto;

public class StudentDetailsdto {
    private Integer studentId;

    private String address;

    private String mobileNumber;

    private String motherName;

    private String fatherName;

    public StudentDetailsdto() {
    }

    public StudentDetailsdto(Integer studentId, String address, String mobileNumber, String motherName, String fatherName) {
        this.studentId = studentId;
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
