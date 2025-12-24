package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.dto.Classdto;
import com.example.schoolmanagementsystem.dto.StudentDetailsdto;
import com.example.schoolmanagementsystem.dto.Studentdto;
import com.example.schoolmanagementsystem.dto.TeacherDetailsdto;
import com.example.schoolmanagementsystem.entity.ClassEntity;
import com.example.schoolmanagementsystem.entity.Student;
import com.example.schoolmanagementsystem.entity.StudentDetails;
import com.example.schoolmanagementsystem.repositories.ClassRepositories;
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

     private ClassRepositories classRepositories;

     @Autowired
     public StudentController(StudentRepositories studentRepositories, ClassRepositories classRepositories){
         this.studentRepositories = studentRepositories;
         this.classRepositories = classRepositories;
     }
    @PostMapping("/students")
    public ResponseEntity<Studentdto> saveStudent(@RequestBody Studentdto req){
        Student student = new Student(req.getFirstName(),req.getLastName());
        studentRepositories.save(student);

        Studentdto myStudent = new Studentdto(student.getStudentId(),student.getFirstName(), student.getLastName());

        return ResponseEntity.ok(myStudent);
    }

    @GetMapping("/students")
    public ResponseEntity<List<Studentdto>> findAllStudent() {

        List<Student> students = studentRepositories.findAll();
        List<Studentdto> userResponse = new ArrayList<>();

        for (Student student : students) {

            Classdto classdto = null;

            if (student.getClassEntity() != null) {
                ClassEntity clas = student.getClassEntity();
                classdto = new Classdto(
                        clas.getClassId(),
                        clas.getSection(),
                        clas.getSubjects()
                );
            }

            StudentDetails details = student.getStudentDetails();

            StudentDetailsdto studentDetailsdto = null;

            if(details!=null){
                studentDetailsdto = new StudentDetailsdto(details.getStudentId(),
                        details.getAddress(),
                        details.getMobileNumber(),
                        details.getMotherName(),
                        details.getFatherName());
            }

            Studentdto response = new Studentdto(
                    student.getStudentId(),
                    student.getFirstName(),
                    student.getLastName(),
                    classdto,
                    studentDetailsdto
            );

            userResponse.add(response);
        }

        return ResponseEntity.ok(userResponse);
    }


    @DeleteMapping("/students/{studentId}")
    public ResponseEntity<?> deleteStudent(@PathVariable Integer studentId){
         Student student = studentRepositories.findById(studentId)
                 .orElseThrow( () -> new RuntimeException("Student not found"));
         student.setTeachers(null);
         studentRepositories.deleteById(studentId);
         return ResponseEntity.ok().build();
    }

    @PostMapping("/students/{studentId}/classes/{classId}")
    public ResponseEntity<?> assignClassToStudent(@PathVariable Integer studentId,
                                                  @PathVariable Integer classId){
         Student student = studentRepositories.findById(studentId)
                 .orElseThrow(()->new RuntimeException("student not found"));
         ClassEntity clas = classRepositories.findById(classId)
                 .orElseThrow(()->new RuntimeException("class not found"));

         student.setClassEntity(clas);
         studentRepositories.save(student);
         return ResponseEntity.ok().build();
    }
}
