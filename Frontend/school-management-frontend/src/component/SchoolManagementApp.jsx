import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, BookOpen, FileText, Plus, Trash2, Edit, X, Save } from 'lucide-react';

const API_URL = 'http://localhost:8080/api';

export default function SchoolManagementApp() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [activeSection, setActiveSection] = useState('teachers');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  const [teacherForm, setTeacherForm] = useState({ firstName: '', lastName: '' });
  const [studentForm, setStudentForm] = useState({ firstName: '', lastName: '' });
  const [classForm, setClassForm] = useState({ section: '', subjects: [] });
  const [newSubject, setNewSubject] = useState('');
  const [detailsForm, setDetailsForm] = useState({
    address: '',
    mobileNumber: '',
    motherName: '',
    fatherName: ''
  });

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${API_URL}/teachers`);
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${API_URL}/classes`);
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openModal = (modalType, item = null) => {
    setActiveModal(modalType);
    setSelectedItem(item);
    setEditMode(false);
    
    if (item) {
      if (modalType === 'teacherDetails' || modalType === 'studentDetails') {
        setDetailsForm(item.details || {
          address: '',
          mobileNumber: '',
          motherName: '',
          fatherName: ''
        });
      } else if (modalType === 'addClass') {
        setClassForm({ section: item.section, subjects: item.subjects || [] });
        setEditMode(true);
      }
    } else {
      setTeacherForm({ firstName: '', lastName: '' });
      setStudentForm({ firstName: '', lastName: '' });
      setClassForm({ section: '', subjects: [] });
      setDetailsForm({ address: '', mobileNumber: '', motherName: '', fatherName: '' });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
    setEditMode(false);
    setNewSubject('');
  };

  const saveTeacher = async () => {
    try {
      if (editMode && selectedItem) {
        await fetch(`${API_URL}/teachers/${selectedItem.teacherId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(teacherForm)
        });
      } else {
        await fetch(`${API_URL}/teachers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(teacherForm)
        });
      }
      fetchTeachers();
      setTeacherForm({ firstName: '', lastName: '' });
      setEditMode(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteTeacher = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`${API_URL}/teachers/${id}`, { method: 'DELETE' });
        fetchTeachers();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const saveStudent = async () => {
    try {
      if (editMode && selectedItem) {
        await fetch(`${API_URL}/students/${selectedItem.studentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentForm)
        });
      } else {
        await fetch(`${API_URL}/students`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentForm)
        });
      }
      fetchStudents();
      setStudentForm({ firstName: '', lastName: '' });
      setEditMode(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`${API_URL}/students/${id}`, { method: 'DELETE' });
        fetchStudents();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const saveClass = async () => {
    try {
      if (editMode && selectedItem) {
        await fetch(`${API_URL}/classes/${selectedItem.classId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(classForm)
        });
      } else {
        await fetch(`${API_URL}/classes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(classForm)
        });
      }
      fetchClasses();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteClass = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`${API_URL}/classes/${id}`, { method: 'DELETE' });
        fetchClasses();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const addSubjectToForm = () => {
    if (newSubject.trim()) {
      setClassForm({
        ...classForm,
        subjects: [...classForm.subjects, newSubject.trim()]
      });
      setNewSubject('');
    }
  };

  const removeSubjectFromForm = (subject) => {
    setClassForm({
      ...classForm,
      subjects: classForm.subjects.filter(s => s !== subject)
    });
  };

  const saveDetails = async () => {
    try {
      const endpoint = activeModal === 'teacherDetails' 
        ? `${API_URL}/teachers/${selectedItem.teacherId}/details`
        : `${API_URL}/students/${selectedItem.studentId}/details`;
      
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detailsForm)
      });
      
      activeModal === 'teacherDetails' ? fetchTeachers() : fetchStudents();
      setSelectedItem(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteDetails = async (item) => {
    if (window.confirm('Are you sure?')) {
      try {
        const endpoint = activeModal === 'teacherDetails'
          ? `${API_URL}/teachers/${item.teacherId}/details`
          : `${API_URL}/students/${item.studentId}/details`;
        
        await fetch(endpoint, { method: 'DELETE' });
        activeModal === 'teacherDetails' ? fetchTeachers() : fetchStudents();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const assignStudent = async (teacherId, studentId) => {
    try {
      await fetch(`${API_URL}/teachers/${teacherId}/students/${studentId}`, {
        method: 'POST'
      });
      fetchTeachers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const unassignStudent = async (teacherId, studentId) => {
    try {
      await fetch(`${API_URL}/teachers/${teacherId}/students/${studentId}`, {
        method: 'DELETE'
      });
      fetchTeachers();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const assignClassToTeacher = async (teacherId, classId) => {
    try {
      await fetch(`${API_URL}/teachers/${teacherId}/classes/${classId}`, {
        method: 'POST'
      });
      fetchTeachers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const unassignClassFromTeacher = async (teacherId, classId) => {
    try {
      await fetch(`${API_URL}/teachers/${teacherId}/classes/${classId}`, {
        method: 'DELETE'
      });
      fetchTeachers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const assignClassToStudent = async (studentId, classId) => {
    try {
      await fetch(`${API_URL}/students/${studentId}/classes/${classId}`, {
        method: 'POST'
      });
      fetchStudents();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const unassignClassFromStudent = async (studentId, classId) => {
    try {
      await fetch(`${API_URL}/students/${studentId}/classes/${classId}`, {
        method: 'DELETE'
      });
      fetchStudents();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      
      <div className="min-vh-100 bg-light">
        <div className="container py-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <GraduationCap className="me-2 text-primary" size={40} />
                <h1 className="mb-0">School Management System</h1>
              </div>
              <p className="text-muted mb-0">Manage teachers, students, classes and relationships</p>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    onClick={() => setActiveSection('teachers')}
                    className={`nav-link ${activeSection === 'teachers' ? 'active' : ''}`}
                  >
                    <Users className="me-1" size={18} />
                    Teachers
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => setActiveSection('students')}
                    className={`nav-link ${activeSection === 'students' ? 'active' : ''}`}
                  >
                    <GraduationCap className="me-1" size={18} />
                    Students
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => setActiveSection('classes')}
                    className={`nav-link ${activeSection === 'classes' ? 'active' : ''}`}
                  >
                    <BookOpen className="me-1" size={18} />
                    Classes
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body">
              {activeSection === 'teachers' && (
                <div>
                  <h2 className="mb-4">Teachers Management</h2>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-3">
                      <button onClick={() => openModal('addTeacher')} className="btn btn-primary w-100">
                        <Plus size={18} className="me-2" />
                        Manage Teachers
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button onClick={() => openModal('teacherStudents')} className="btn btn-info w-100 text-white">
                        <Users size={18} className="me-2" />
                        Assign Students
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button onClick={() => openModal('teacherDetails')} className="btn btn-success w-100">
                        <FileText size={18} className="me-2" />
                        Teacher Details
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button onClick={() => openModal('teacherClasses')} className="btn btn-warning w-100">
                        <BookOpen size={18} className="me-2" />
                        Assign Classes
                      </button>
                    </div>
                  </div>

                  <div className="row g-3">
                    {teachers.map(teacher => (
                      <div key={teacher.teacherId} className="col-12">
                        <div className="card">
                          <div className="card-body">
                            <h5>{teacher.firstName} {teacher.lastName}</h5>
                            <p className="text-muted small">ID: {teacher.teacherId}</p>
                            {teacher.students && teacher.students.length > 0 && (
                              <div className="mb-2">
                                <strong>Students: </strong>
                                {teacher.students.map(s => `${s.firstName} ${s.lastName}`).join(', ')}
                              </div>
                            )}
                            {teacher.classes && teacher.classes.length > 0 && (
                              <div>
                                <strong>Classes: </strong>
                                {teacher.classes.map(c => c.section).join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'students' && (
                <div>
                  <h2 className="mb-4">Students Management</h2>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <button onClick={() => openModal('addStudent')} className="btn btn-primary w-100">
                        <Plus size={18} className="me-2" />
                        Manage Students
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button onClick={() => openModal('studentClasses')} className="btn btn-warning w-100">
                        <BookOpen size={18} className="me-2" />
                        Assign Classes
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button onClick={() => openModal('studentDetails')} className="btn btn-success w-100">
                        <FileText size={18} className="me-2" />
                        Student Details
                      </button>
                    </div>
                  </div>

                  <div className="row g-3">
                    {students.map(student => (
                      <div key={student.studentId} className="col-md-6 col-lg-4">
                        <div className="card">
                          <div className="card-body">
                            <h5>{student.firstName} {student.lastName}</h5>
                            <p className="text-muted small">ID: {student.studentId}</p>
                            {student.classes && student.classes.length > 0 && (
                              <div>
                                <strong>Classes: </strong>
                                {student.classes.map(c => c.section).join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'classes' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Classes Management</h2>
                    <button onClick={() => openModal('addClass')} className="btn btn-primary">
                      <Plus size={18} className="me-2" />
                      Add Class
                    </button>
                  </div>

                  <div className="row g-3">
                    {classes.map(cls => (
                      <div key={cls.classId} className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                              <div>
                                <h5 className="mb-1">Section: {cls.section}</h5>
                                <p className="text-muted small mb-0">ID: {cls.classId}</p>
                              </div>
                              <div>
                                <button 
                                  onClick={() => openModal('addClass', cls)}
                                  className="btn btn-sm btn-warning me-2"
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  onClick={() => deleteClass(cls.classId)}
                                  className="btn btn-sm btn-danger"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            
                            {cls.subjects && cls.subjects.length > 0 && (
                              <div>
                                <strong className="d-block mb-2">Subjects:</strong>
                                <div className="d-flex flex-wrap gap-2">
                                  {cls.subjects.map((subject, idx) => (
                                    <span key={idx} className="badge bg-primary">{subject}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {activeModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeModal}>
            <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {activeModal === 'addTeacher' && 'Manage Teachers'}
                    {activeModal === 'teacherStudents' && 'Assign Students'}
                    {activeModal === 'teacherDetails' && 'Teacher Details'}
                    {activeModal === 'teacherClasses' && 'Assign Classes'}
                    {activeModal === 'addStudent' && 'Manage Students'}
                    {activeModal === 'studentClasses' && 'Assign Classes'}
                    {activeModal === 'studentDetails' && 'Student Details'}
                    {activeModal === 'addClass' && (editMode ? 'Edit Class' : 'Add Class')}
                  </h5>
                  <button type="button" className="btn-close" onClick={closeModal} />
                </div>
                
                <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  {activeModal === 'addTeacher' && (
                    <div>
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6>Add/Edit Teacher</h6>
                          <div className="row g-3">
                            <div className="col-md-5">
                              <input
                                type="text"
                                placeholder="First Name"
                                value={teacherForm.firstName}
                                onChange={(e) => setTeacherForm({...teacherForm, firstName: e.target.value})}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-5">
                              <input
                                type="text"
                                placeholder="Last Name"
                                value={teacherForm.lastName}
                                onChange={(e) => setTeacherForm({...teacherForm, lastName: e.target.value})}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-2">
                              <button onClick={saveTeacher} className="btn btn-success w-100">
                                {editMode ? 'Update' : 'Add'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h6 className="mb-3">All Teachers</h6>
                      <div className="list-group">
                        {teachers.map(t => (
                          <div key={t.teacherId} className="list-group-item d-flex justify-content-between">
                            <span>{t.firstName} {t.lastName}</span>
                            <div>
                              <button
                                onClick={() => {
                                  setSelectedItem(t);
                                  setTeacherForm({ firstName: t.firstName, lastName: t.lastName });
                                  setEditMode(true);
                                }}
                                className="btn btn-sm btn-warning me-2"
                              >
                                <Edit size={16} />
                              </button>
                              <button onClick={() => deleteTeacher(t.teacherId)} className="btn btn-sm btn-danger">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeModal === 'addStudent' && (
                    <div>
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6>Add/Edit Student</h6>
                          <div className="row g-3">
                            <div className="col-md-5">
                              <input
                                type="text"
                                placeholder="First Name"
                                value={studentForm.firstName}
                                onChange={(e) => setStudentForm({...studentForm, firstName: e.target.value})}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-5">
                              <input
                                type="text"
                                placeholder="Last Name"
                                value={studentForm.lastName}
                                onChange={(e) => setStudentForm({...studentForm, lastName: e.target.value})}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-2">
                              <button onClick={saveStudent} className="btn btn-success w-100">
                                {editMode ? 'Update' : 'Add'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h6 className="mb-3">All Students</h6>
                      <div className="list-group">
                        {students.map(s => (
                          <div key={s.studentId} className="list-group-item d-flex justify-content-between">
                            <span>{s.firstName} {s.lastName}</span>
                            <div>
                              <button
                                onClick={() => {
                                  setSelectedItem(s);
                                  setStudentForm({ firstName: s.firstName, lastName: s.lastName });
                                  setEditMode(true);
                                }}
                                className="btn btn-sm btn-warning me-2"
                              >
                                <Edit size={16} />
                              </button>
                              <button onClick={() => deleteStudent(s.studentId)} className="btn btn-sm btn-danger">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeModal === 'addClass' && (
                    <div>
                      <div className="row g-3 mb-3">
                        <div className="col-md-12">
                          <label className="form-label">Section</label>
                          <input
                            type="text"
                            placeholder="e.g., 10-A"
                            value={classForm.section}
                            onChange={(e) => setClassForm({...classForm, section: e.target.value})}
                            className="form-control"
                          />
                        </div>
                        
                        <div className="col-md-12">
                          <label className="form-label">Add Subjects</label>
                          <div className="input-group">
                            <input
                              type="text"
                              placeholder="Subject name"
                              value={newSubject}
                              onChange={(e) => setNewSubject(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addSubjectToForm()}
                              className="form-control"
                            />
                            <button onClick={addSubjectToForm} className="btn btn-outline-primary">
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>
                        
                        {classForm.subjects.length > 0 && (
                          <div className="col-md-12">
                            <label className="form-label">Current Subjects:</label>
                            <div className="d-flex flex-wrap gap-2">
                              {classForm.subjects.map((subj, idx) => (
                                <span key={idx} className="badge bg-primary d-flex align-items-center">
                                  {subj}
                                  <button
                                    onClick={() => removeSubjectFromForm(subj)}
                                    className="btn-close btn-close-white ms-2"
                                    style={{ fontSize: '0.6rem' }}
                                  />
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button onClick={saveClass} className="btn btn-success">
                        <Save size={16} className="me-1" /> Save Class
                      </button>
                    </div>
                  )}

                  {activeModal === 'teacherStudents' && (
                    <div>
                      {teachers.map(t => (
                        <div key={t.teacherId} className="card mb-3">
                          <div className="card-body">
                            <h6>{t.firstName} {t.lastName}</h6>
                            <div className="mb-3">
                              <strong>Assigned:</strong>
                              <div className="d-flex flex-wrap gap-2 mt-2">
                                {t.students && t.students.length > 0 ? (
                                  t.students.map(s => (
                                    <span key={s.studentId} className="badge bg-primary">
                                      {s.firstName} {s.lastName}
                                      <button
                                        onClick={() => unassignStudent(t.teacherId, s.studentId)}
                                        className="btn-close btn-close-white ms-2"
                                        style={{ fontSize: '0.6rem' }}
                                      />
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-muted">None</span>
                                )}
                              </div>
                            </div>
                            <div>
                              <strong>Available:</strong>
                              <div className="d-flex flex-wrap gap-2 mt-2">
                                {students.filter(s => !t.students?.find(ts => ts.studentId === s.studentId))
                                  .map(s => (
                                    <button
                                      key={s.studentId}
                                      onClick={() => assignStudent(t.teacherId, s.studentId)}
                                      className="btn btn-sm btn-outline-primary"
                                    >
                                      + {s.firstName} {s.lastName}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeModal === 'teacherClasses' && (
                    <div>
                      {teachers.map(t => (
                        <div key={t.teacherId} className="card mb-3">
                          <div className="card-body">
                            <h6>{t.firstName} {t.lastName}</h6>
                            <div className="mb-3">
                              <strong>Assigned:</strong>
                              <div className="d-flex flex-wrap gap-2 mt-2">
                                {t.classes && t.classes.length > 0 ? (
                                  t.classes.map(c => (
                                    <span key={c.classId} className="badge bg-warning">
                                      {c.section}
                                      <button
                                        onClick={() => unassignClassFromTeacher(t.teacherId, c.classId)}
                                        className="btn-close ms-2"
                                        style={{ fontSize: '0.6rem' }}
                                      />
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-muted">None</span>
                                )}
                              </div>
                            </div>
                            <div>
                              <strong>Available:</strong>
                              <div className="d-flex flex-wrap gap-2 mt-2">
                                {classes.filter(c => !t.classes?.find(tc => tc.classId === c.classId))
                                  .map(c => (
                                    <button
                                      key={c.classId}
                                      onClick={() => assignClassToTeacher(t.teacherId, c.classId)}
                                      className="btn btn-sm btn-outline-warning"
                                    >
                                      + {c.section}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
{activeModal === 'studentClasses' && (
  <div>
    {students.map(s => (
      <div key={s.studentId} className="card mb-3">
        <div className="card-body">
          <h6>{s.firstName} {s.lastName}</h6>

          {/* Enrolled Class */}
          <div className="mb-3">
            <strong>Enrolled Class:</strong>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {s.class ? (
                <div className="card border-warning mb-2">
                  <div className="card-body p-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong>{s.class.section}</strong>
                        {s.class.subjects && s.class.subjects.length > 0 && (
                          <div className="mt-1">
                            <small>Subjects: {s.class.subjects.join(', ')}</small>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          unassignClassFromStudent(s.studentId, s.class.classId)
                        }
                        className="btn btn-sm btn-danger"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-muted">None</span>
              )}
            </div>
          </div>

          {/* Available Classes */}
          <div>
            <strong>Available Classes:</strong>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {classes
                .filter(c => s.class?.classId !== c.classId)
                .map(c => (
                  <button
                    key={c.classId}
                    onClick={() => assignClassToStudent(s.studentId, c.classId)}
                    className="btn btn-sm btn-outline-warning"
                  >
                    + {c.section}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

                  {activeModal === 'teacherDetails' && (
                    <div>
                      {teachers.map(t => (
                        <div key={t.teacherId} className="card mb-3">
                          <div className="card-body">
                            <h6>{t.firstName} {t.lastName}</h6>
                            {t.details ? (
                              <div>
                                <p><strong>Address:</strong> {t.details.address || 'N/A'}</p>
                                <p><strong>Mobile:</strong> {t.details.mobileNumber || 'N/A'}</p>
                                <p><strong>Mother:</strong> {t.details.motherName || 'N/A'}</p>
                                <p><strong>Father:</strong> {t.details.fatherName || 'N/A'}</p>
                                <button
                                  onClick={() => {
                                    setSelectedItem(t);
                                    setDetailsForm(t.details);
                                    setEditMode(true);
                                  }}
                                  className="btn btn-sm btn-warning me-2"
                                >
                                  <Edit size={16} /> Edit
                                </button>
                                <button
                                  onClick={() => deleteDetails(t)}
                                  className="btn btn-sm btn-danger"
                                >
                                  <Trash2 size={16} /> Delete
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedItem(t);
                                  setDetailsForm({ address: '', mobileNumber: '', motherName: '', fatherName: '' });
                                }}
                                className="btn btn-sm btn-primary"
                              >
                                + Add Details
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {selectedItem && (
                        <div className="card bg-light mt-3">
                          <div className="card-body">
                            <h6>{editMode ? 'Edit' : 'Add'} Details for {selectedItem.firstName} {selectedItem.lastName}</h6>
                            <div className="row g-3">
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  placeholder="Address"
                                  value={detailsForm.address}
                                  onChange={(e) => setDetailsForm({...detailsForm, address: e.target.value})}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  placeholder="Mobile"
                                  value={detailsForm.mobileNumber}
                                  onChange={(e) => setDetailsForm({...detailsForm, mobileNumber: e.target.value})}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  placeholder="Mother's Name"
                                  value={detailsForm.motherName}
                                  onChange={(e) => setDetailsForm({...detailsForm, motherName: e.target.value})}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  placeholder="Father's Name"
                                  value={detailsForm.fatherName}
                                  onChange={(e) => setDetailsForm({...detailsForm, fatherName: e.target.value})}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-12">
                                <button onClick={saveDetails} className="btn btn-success me-2">
                                  <Save size={16} /> Save
                                </button>
                                <button onClick={() => setSelectedItem(null)} className="btn btn-secondary">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeModal === 'studentDetails' && (
                    <div>
                      {students.map(s => (
                        <div key={s.studentId} className="card mb-3">
                          <div className="card-body">
                            <h6>{s.firstName} {s.lastName}</h6>
                            {s.details ? (
                              <div>
                                <p><strong>Address:</strong> {s.details.address || 'N/A'}</p>
                                <p><strong>Mobile:</strong> {s.details.mobileNumber || 'N/A'}</p>
                                <p><strong>Mother:</strong> {s.details.motherName || 'N/A'}</p>
                                <p><strong>Father:</strong> {s.details.fatherName || 'N/A'}</p>
                                <button
                                  onClick={() => {
                                    setSelectedItem(s);
                                    setDetailsForm(s.details);
                                    setEditMode(true);
                                  }}
                                  className="btn btn-sm btn-warning me-2"
                                >
                                  <Edit size={16} /> Edit
                                </button>
                                <button
                                  onClick={() => deleteDetails(s)}
                                  className="btn btn-sm btn-danger"
                                >
                                  <Trash2 size={16} /> Delete
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedItem(s);
                                  setDetailsForm({ address: '', mobileNumber: '', motherName: '', fatherName: '' });
                                }}
                                className="btn btn-sm btn-primary"
                              >
                                + Add Details
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {selectedItem && (
                        <div className="card bg-light mt-3">
                          <div className="card-body">
                            <h6>{editMode ? 'Edit' : 'Add'} Details for {selectedItem.firstName} {selectedItem.lastName}</h6>
                            <div className="row g-3">
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  placeholder="Address"
                                  value={detailsForm.address}
                                  onChange={(e) => setDetailsForm({...detailsForm, address: e.target.value})}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  placeholder="Mobile"
                                  value={detailsForm.mobileNumber}
                                  onChange={(e) => setDetailsForm({...detailsForm, mobileNumber: e.target.value})}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  placeholder="Mother's Name"
                                  value={detailsForm.motherName}
                                  onChange={(e) => setDetailsForm({...detailsForm, motherName: e.target.value})}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  placeholder="Father's Name"
                                  value={detailsForm.fatherName}
                                  onChange={(e) => setDetailsForm({...detailsForm, fatherName: e.target.value})}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-12">
                                <button onClick={saveDetails} className="btn btn-success me-2">
                                  <Save size={16} /> Save
                                </button>
                                <button onClick={() => setSelectedItem(null)} className="btn btn-secondary">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}