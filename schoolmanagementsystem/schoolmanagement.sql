-- Create Database
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Teacher Table
CREATE TABLE teacher (
    teacher_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Student Table
CREATE TABLE student (
    student_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Junction Table for Many-to-Many Relationship
CREATE TABLE teacher_student (
    teacher_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (teacher_id, student_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
);

-- Create Indexes for better query performance
CREATE INDEX idx_teacher_name ON teacher(last_name, first_name);
CREATE INDEX idx_student_name ON student(last_name, first_name);