package com.example.schoolmanagementsystem.repositories;

import com.example.schoolmanagementsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StudentRepositories extends PagingAndSortingRepository<Student, Integer>, CrudRepository<Student, Integer> {
}
