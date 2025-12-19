package com.example.schoolmanagementsystem.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Teacher {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="teacher_id")
    private Integer teacherId;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;


    @ManyToMany(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(
            name="teacher_student",
            joinColumns=@JoinColumn(name="teacher_id"),
            inverseJoinColumns=@JoinColumn(name="student_id")
    )
    private List<Student> students;

    public Teacher() {
    }

    public Teacher(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
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

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public void addStudents(Student student){
        if(students == null){
            students = new ArrayList<>();

        }

        students.add(student);

    }
}
