package com.example.schoolmanagementsystem.controller;

import com.example.schoolmanagementsystem.dto.Classdto;
import com.example.schoolmanagementsystem.entity.ClassEntity;
import com.example.schoolmanagementsystem.repositories.ClassRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ClassController{

    private ClassRepositories classRepositories;

    @Autowired
    public ClassController(ClassRepositories classRepositories) {
        this.classRepositories = classRepositories;
    }

    @GetMapping("/classes")
    public ResponseEntity<List<Classdto>> findAllClass(){
        List<Classdto> userResponse = new ArrayList<>();
        List<ClassEntity> classes = classRepositories.findAll();
        for(ClassEntity clas:classes){
            Classdto response = new Classdto(clas.getClassId(),clas.getSection(),clas.getSubjects());
            userResponse.add(response);
        }

        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/classes")
    public ResponseEntity<?> saveClass(@RequestBody Classdto req){
        ClassEntity clas = new ClassEntity(req.getSection(),req.getSubjects());
        classRepositories.save(clas);
        return ResponseEntity.ok().build();
    }
}
