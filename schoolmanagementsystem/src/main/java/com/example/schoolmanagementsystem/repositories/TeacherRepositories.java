package com.example.schoolmanagementsystem.repositories;

import com.example.schoolmanagementsystem.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepositories extends JpaRepository<Teacher, Integer> {
}
