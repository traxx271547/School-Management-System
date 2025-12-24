package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.dto.TeacherDetailsdto;
import com.example.schoolmanagementsystem.entity.Teacher;
import com.example.schoolmanagementsystem.entity.TeacherDetails;
import com.example.schoolmanagementsystem.repositories.TeacherDetailsRepositories;
import com.example.schoolmanagementsystem.repositories.TeacherRepositories;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TeacherDetailsController {

    private TeacherDetailsRepositories teacherDetailsRepositories;

    private TeacherRepositories teacherRepositories;

    public TeacherDetailsController(TeacherDetailsRepositories teacherDetailsRepositories, TeacherRepositories teacherRepositories) {
        this.teacherDetailsRepositories = teacherDetailsRepositories;
        this.teacherRepositories = teacherRepositories;
    }

    @PostMapping("/teachers/{teacherId}/details")
    public ResponseEntity<?> addDetails(@RequestBody TeacherDetailsdto req,
                                        @PathVariable Integer teacherId){
        TeacherDetails teacherDetails = new TeacherDetails(req.getMobileNumber(),req.getAddress(),
                req.getMotherName(),req.getFatherName());
        Teacher teacher = teacherRepositories.findById(teacherId)
                .orElseThrow(()->new RuntimeException("teacher not found"));
        teacherDetails.setTeacher(teacher);
        teacher.setTeacherDetails(teacherDetails);
        teacherRepositories.save(teacher);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/teachers/{teacherId}/details")
    public ResponseEntity<?> deleteDetails(@PathVariable Integer teacherId){
       Teacher teacher = teacherRepositories.findById(teacherId).get();
       teacher.setTeacherDetails(null);
       teacherRepositories.save(teacher);
       return ResponseEntity.ok().build();

    }


}
