package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.dto.Classdto;
import com.example.schoolmanagementsystem.dto.Studentdto;
import com.example.schoolmanagementsystem.dto.TeacherDetailsdto;
import com.example.schoolmanagementsystem.dto.Teacherdto;
import com.example.schoolmanagementsystem.entity.ClassEntity;
import com.example.schoolmanagementsystem.entity.Student;
import com.example.schoolmanagementsystem.entity.Teacher;
import com.example.schoolmanagementsystem.entity.TeacherDetails;
import com.example.schoolmanagementsystem.repositories.ClassRepositories;
import com.example.schoolmanagementsystem.repositories.StudentRepositories;
import com.example.schoolmanagementsystem.repositories.TeacherDetailsRepositories;
import com.example.schoolmanagementsystem.repositories.TeacherRepositories;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TeacherController {

    private TeacherRepositories teacherRepositories;

    private StudentRepositories studentRepositories;

    private ClassRepositories classRepositories;

    private TeacherDetailsRepositories teacherDetailsRepositories;

    @Autowired
    public TeacherController(TeacherRepositories teacherRepositories, StudentRepositories studentRepositories,
                             ClassRepositories classRepositories){
        this.teacherRepositories = teacherRepositories;
        this.studentRepositories = studentRepositories;
        this.classRepositories = classRepositories;
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<Teacherdto>> findAllTeacher(){
        List<Teacher> teachers = (ArrayList)teacherRepositories.findAll();
        List<Teacherdto> userResponse = new ArrayList<>();
        for(Teacher teacher:teachers){


            List<Studentdto> students = teacher.getStudents().stream()
                    .map(s -> new Studentdto(
                            s.getStudentId(),
                            s.getFirstName(),
                            s.getLastName()
                    ))
                    .toList();

            List<Classdto> classes = teacher.getClasses().stream()
                    .map(s->new Classdto(
                            s.getClassId(),
                            s.getSection(),
                            s.getSubjects()
                            )).toList();

            TeacherDetails details = teacher.getTeacherDetails();

            TeacherDetailsdto teacherDetailsdto = null;

            if(details!=null){
                teacherDetailsdto = new TeacherDetailsdto(details.getTeacherId(),
                        details.getAddress(),
                        details.getMobileNumber(),
                        details.getMotherName(),
                        details.getFatherName());
            }
            Teacherdto response = new Teacherdto(teacher.getTeacherId(),
                    teacher.getFirstName(),
                    teacher.getLastName(),
                    students,
                    classes,
                    teacherDetailsdto);
            userResponse.add(response);
        }
        return ResponseEntity.ok(userResponse);

    }

    @PostMapping("/teachers")
    public ResponseEntity<Teacherdto> saveTeacher(@RequestBody Teacherdto req){
        Teacher teacher = new Teacher(req.getFirstName(),req.getLastName());
        teacherRepositories.save(teacher);

        Teacherdto resp = new Teacherdto(teacher.getTeacherId(),teacher.getFirstName(),teacher.getLastName());
        return ResponseEntity.ok(resp);

    }

    @DeleteMapping("/teachers/{teacherId}")
    public ResponseEntity<?> deleteStudent(@PathVariable Integer teacherId){
        Teacher teacher = teacherRepositories.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        teacherRepositories.delete(teacher);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/teachers/{teacherId}/students/{studentId}")
    public ResponseEntity<?> assignStudent(@PathVariable Integer teacherId,
                                           @PathVariable Integer studentId){
        Teacher teacher = teacherRepositories.findById(teacherId)
                          .orElseThrow(() -> new RuntimeException("Teacher not found"));
        Student student = studentRepositories.findById(studentId)
                        .orElseThrow(() -> new RuntimeException("Student not found"));

        teacher.getStudents().add(student);
        student.getTeachers().add(teacher);
        teacherRepositories.save(teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body("Created");
    }

    @DeleteMapping("/teachers/{teacherId}/students/{studentId}")
    public ResponseEntity<?> deleteStudent(@PathVariable Integer teacherId,
                                           @PathVariable Integer studentId){
        Teacher teacher = teacherRepositories.findById(teacherId).
                orElseThrow(()->new RuntimeException("Teacher not found"));

        Student student = studentRepositories.findById(studentId)
                .orElseThrow(()->new RuntimeException("Student not found"));

        teacher.getStudents().remove(student);
        student.getTeachers().remove(teacher);
        teacherRepositories.save(teacher);

        return ResponseEntity.ok().build();
    }

    //assigns classes
    @PostMapping("/teachers/{teacherId}/classes/{classId}")
    public ResponseEntity<?> assignClassToTeacher(@PathVariable Integer teacherId,
                                                  @PathVariable Integer classId){
        Teacher teacher = teacherRepositories.findById(teacherId)
                .orElseThrow(()->new RuntimeException("Teacher not found"));
        ClassEntity clas = classRepositories.findById(classId)
                .orElseThrow(()->new RuntimeException("Class not found"));
        teacher.getClasses().add(clas);
        teacherRepositories.save(teacher);


        return ResponseEntity.ok().build();
    }

    //delete classes
    @DeleteMapping("/teachers/{teacherId}/classes/{classId}")
    public ResponseEntity<?> unassignClassToTeacher(@PathVariable Integer teacherId,
                                                    @PathVariable Integer classId){
        Teacher teacher = teacherRepositories.findById(teacherId)
                .orElseThrow(()->new RuntimeException("Teacher not found"));
        ClassEntity clas = classRepositories.findById(classId)
                .orElseThrow(()->new RuntimeException("Class not found"));

        teacher.getClasses().remove(clas);
        teacherRepositories.save(teacher);
        return ResponseEntity.ok().build();
    }



}
