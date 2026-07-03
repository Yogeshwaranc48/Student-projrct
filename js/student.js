import { saveStudents, loadStudents } from './storage.js';

let students = loadStudents();

export const getStudents = () => [...students];

export const setStudents = (newStudents) => {
  students = newStudents;
};

export const addStudent = (studentData) => {
  const newStudent = {
    ...studentData,
    id: Date.now().toString()
  };
  
  // Check for duplicate email
  if (students.some(s => s.email === newStudent.email)) {
    throw new Error('Student with this email already exists');
  }

  students.push(newStudent);
  saveStudents(students);
  return newStudent;
};

export const updateStudent = (id, updatedData) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Student not found');
  }

  // Check for duplicate email (excluding the current student)
  if (students.some(s => s.email === updatedData.email && s.id !== id)) {
    throw new Error('Another student with this email already exists');
  }

  students[index] = { ...students[index], ...updatedData };
  saveStudents(students);
  return students[index];
};

export const deleteStudent = (id) => {
  const initialLength = students.length;
  students = students.filter(s => s.id !== id);
  
  if (students.length === initialLength) {
    throw new Error('Student not found');
  }
  
  saveStudents(students);
  return true;
};

export const searchStudents = (query) => {
  if (!query || query.trim() === '') {
    return [...students];
  }
  
  const lowerQuery = query.toLowerCase().trim();
  return students.filter(s => 
    s.name.toLowerCase().includes(lowerQuery) || 
    s.email.toLowerCase().includes(lowerQuery)
  );
};

export const filterStudentsByDepartment = (department, currentList = students) => {
  if (!department || department.trim() === '') {
    return [...currentList];
  }
  return currentList.filter(s => s.department === department);
};

export const sortStudentsByName = (currentList = students, ascending = true) => {
  return [...currentList].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return ascending ? -1 : 1;
    if (nameA > nameB) return ascending ? 1 : -1;
    return 0;
  });
};
