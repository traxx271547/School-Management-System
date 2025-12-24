package com.example.schoolmanagementsystem.repositories;

import com.example.schoolmanagementsystem.entity.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDetailsRepositories extends JpaRepository<StudentDetails,Integer> {
}
