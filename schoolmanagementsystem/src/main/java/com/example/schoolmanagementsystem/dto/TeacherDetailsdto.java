package com.example.schoolmanagementsystem.dto;

public class TeacherDetailsdto {
    private Integer teacherId;

    private String address;

    private String mobileNumber;

    private String motherName;

    private String fatherName;

    public TeacherDetailsdto() {
    }

    public TeacherDetailsdto(Integer teacherId, String address, String mobileNumber, String motherName, String fatherName) {
        this.teacherId = teacherId;
        this.address = address;
        this.mobileNumber = mobileNumber;
        this.motherName = motherName;
        this.fatherName = fatherName;
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
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
