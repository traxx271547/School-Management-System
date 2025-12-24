package com.example.schoolmanagementsystem.repositories;

import com.example.schoolmanagementsystem.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeacherRepositories extends JpaRepository<Teacher, Integer>{
    List<Teacher> findByLastName(@Param("last_name") String lastName);

}
