package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.dto.Studentdto;
import com.example.schoolmanagementsystem.entity.Student;
import com.example.schoolmanagementsystem.repositories.StudentRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentController {
     private StudentRepositories studentRepositories;

     @Autowired
     public StudentController(StudentRepositories studentRepositories){
         this.studentRepositories = studentRepositories;
     }
    @PostMapping("/students")
    public ResponseEntity<Studentdto> saveStudent(@RequestBody Studentdto req){
        Student student = new Student(req.getFirstName(),req.getLastName());
        studentRepositories.save(student);

        Studentdto myStudent = new Studentdto(student.getStudentId(),student.getFirstName(), student.getLastName());

        return ResponseEntity.ok(myStudent);
    }

    @GetMapping("/students")
    public ResponseEntity<List<Studentdto>> findAllStudent(){
         List<Student> students = (ArrayList)studentRepositories.findAll();
         List<Studentdto> UserResponse = new ArrayList<>();
         for(Student student:students){
             Studentdto response = new Studentdto(student.getStudentId(),
                                                  student.getFirstName(),
                                                  student.getLastName());
             UserResponse.add(response);
         }
         return ResponseEntity.ok(UserResponse);
    }

    @DeleteMapping("/students/{studentId}")
    public ResponseEntity<?> deleteStudent(@PathVariable Integer studentId){
         Student student = studentRepositories.findById(studentId)
                 .orElseThrow( () -> new RuntimeException("Student not found"));
         student.setTeachers(null);
         studentRepositories.deleteById(studentId);
         return ResponseEntity.ok().build();
    }
}
