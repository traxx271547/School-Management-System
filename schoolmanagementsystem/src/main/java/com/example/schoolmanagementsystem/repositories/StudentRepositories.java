package com.example.schoolmanagementsystem.repositories;

import com.example.schoolmanagementsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepositories extends JpaRepository<Student, Integer> {
}
