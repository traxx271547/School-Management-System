package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.dto.StudentDetailsdto;
import com.example.schoolmanagementsystem.entity.Student;
import com.example.schoolmanagementsystem.entity.StudentDetails;
import com.example.schoolmanagementsystem.repositories.StudentRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class StudentDetailsController {

    private StudentRepositories studentRepositories;

    @Autowired
    public StudentDetailsController(StudentRepositories studentRepositories) {
        this.studentRepositories = studentRepositories;
    }

    @PostMapping("/students/{studentId}/details")
    public ResponseEntity<?> addStudentDetails(@RequestBody StudentDetailsdto req,
                                               @PathVariable Integer studentId){
        StudentDetails details = new StudentDetails(req.getAddress(), req.getMobileNumber(),
                req.getFatherName(), req.getMotherName());
        Student student = studentRepositories.findById(studentId)
                .orElseThrow(()->new RuntimeException("Student not found"));
        details.setStudent(student);
        student.setStudentDetails(details);
        studentRepositories.save(student);
        return ResponseEntity.ok().build();


    }

    @DeleteMapping("/students/{studentId}/details")
    public ResponseEntity<?> deleteStudentDetails(@PathVariable Integer studentId){
        Student student = studentRepositories.findById(studentId).get();
        student.setStudentDetails(null);
        studentRepositories.save(student);
        return ResponseEntity.ok().build();
    }
}
