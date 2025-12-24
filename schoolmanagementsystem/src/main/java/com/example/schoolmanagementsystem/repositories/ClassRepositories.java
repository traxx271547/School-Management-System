package com.example.schoolmanagementsystem.repositories;

import com.example.schoolmanagementsystem.entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepositories extends JpaRepository<ClassEntity, Integer> {
}
