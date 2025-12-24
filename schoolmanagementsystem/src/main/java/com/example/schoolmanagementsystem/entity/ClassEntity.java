package com.example.schoolmanagementsystem.entity;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name="class")
public class ClassEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="class_id")
    private Integer classId;

    @Column(name="section")
    private String section;

    @ElementCollection
    @CollectionTable(
            name = "subjects",
            joinColumns = @JoinColumn(name = "class_id")
    )
    @Column(name = "subject_name")
    private Set<String> subjects;

    @OneToMany(mappedBy="classEntity")
    private List<Student> students;




    public ClassEntity() {
    }

    public ClassEntity(String section, Set<String> subjects) {
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
