import { validateStudentForm } from './validation.js';
import { 
  addStudent, 
  updateStudent, 
  deleteStudent, 
  getStudents,
  searchStudents,
  filterStudentsByDepartment,
  sortStudentsByName
} from './student.js';
import { 
  renderStudentsTable, 
  displayNotification, 
  showValidationErrors, 
  clearValidationErrors,
  populateForm,
  resetForm
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('student-form');
  const searchInput = document.getElementById('search-input');
  const departmentFilter = document.getElementById('department-filter');
  const sortFilter = document.getElementById('sort-filter');
  const cancelBtn = document.getElementById('cancel-btn');

  // Initial render
  updateTable();

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const id = document.getElementById('student-id').value;
      const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        department: document.getElementById('department').value
      };

      const validation = validateStudentForm(studentData);
      
      if (!validation.isValid) {
        showValidationErrors(validation.errors);
        displayNotification('Please fix the errors in the form', 'error');
        return;
      }

      clearValidationErrors();

      try {
        if (id) {
          updateStudent(id, studentData);
          displayNotification('Student updated successfully');
        } else {
          addStudent(studentData);
          displayNotification('Student added successfully');
        }
        resetForm();
        updateTable();
      } catch (error) {
        displayNotification(error.message, 'error');
      }
    });
  }

  // Handle Cancel Button
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      resetForm();
    });
  }

  // Handle Search
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      updateTable();
    });
  }

  // Handle Filter
  if (departmentFilter) {
    departmentFilter.addEventListener('change', () => {
      updateTable();
    });
  }

  // Handle Sort
  if (sortFilter) {
    sortFilter.addEventListener('change', () => {
      updateTable();
    });
  }

  // Global Handlers for Edit/Delete
  window.handleEdit = (id) => {
    const students = getStudents();
    const student = students.find(s => s.id === id);
    if (student) {
      populateForm(student);
    }
  };

  window.handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        deleteStudent(id);
        displayNotification('Student deleted successfully');
        updateTable();
      } catch (error) {
        displayNotification(error.message, 'error');
      }
    }
  };

  function updateTable() {
    let currentStudents = getStudents();
    
    if (searchInput && searchInput.value) {
      currentStudents = searchStudents(searchInput.value);
    }
    
    if (departmentFilter && departmentFilter.value) {
      currentStudents = filterStudentsByDepartment(departmentFilter.value, currentStudents);
    }
    
    if (sortFilter && sortFilter.value) {
      const ascending = sortFilter.value === 'asc';
      currentStudents = sortStudentsByName(currentStudents, ascending);
    }
    
    renderStudentsTable(currentStudents, window.handleDelete, window.handleEdit);
  }
});
