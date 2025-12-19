package com.example.schoolmanagementsystem.repositories;

import com.example.schoolmanagementsystem.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeacherRepositories extends PagingAndSortingRepository<Teacher, Integer>, CrudRepository<Teacher, Integer> {
    List<Teacher> findByLastName(@Param("last_name") String lastName);

}
