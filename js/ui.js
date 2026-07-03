export const renderStudentsTable = (students, onDelete, onEdit) => {
  const tableBody = document.getElementById('students-table-body');
  const emptyState = document.getElementById('empty-state');
  const tableContainer = document.querySelector('.table-responsive');

  if (!tableBody || !emptyState || !tableContainer) return;

  tableBody.innerHTML = '';

  if (students.length === 0) {
    tableContainer.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  tableContainer.style.display = 'block';
  emptyState.style.display = 'none';

  students.forEach(student => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-slate-50/80 group';
    
    // Determine badge colors based on department
    let badgeColor = 'bg-blue-50 text-blue-700';
    if (student.department === 'Engineering') badgeColor = 'bg-amber-50 text-amber-700';
    if (student.department === 'Business') badgeColor = 'bg-purple-50 text-purple-700';
    if (student.department === 'Arts') badgeColor = 'bg-rose-50 text-rose-700';

    row.innerHTML = `
      <td class="px-6 py-4 font-semibold text-slate-800">${escapeHTML(student.name)}</td>
      <td class="px-6 py-4 text-slate-500">${escapeHTML(student.email)}</td>
      <td class="px-6 py-4">${escapeHTML(student.age.toString())}</td>
      <td class="px-6 py-4"><span class="px-2 py-1 ${badgeColor} rounded-md text-[10px] font-bold uppercase">${escapeHTML(student.department)}</span></td>
      <td class="px-6 py-4 text-right actions-cell">
        <button class="btn btn-edit text-slate-400 hover:text-indigo-600 mx-2 font-medium" data-id="${escapeHTML(student.id)}">Edit</button>
        <button class="btn btn-danger text-slate-400 hover:text-rose-600 font-medium" data-id="${escapeHTML(student.id)}">Delete</button>
      </td>
    `;
    
    // Attach event listeners
    const editBtn = row.querySelector('.btn-edit');
    const deleteBtn = row.querySelector('.btn-danger');
    
    if (editBtn && onEdit) {
      editBtn.addEventListener('click', () => onEdit(student.id));
    }
    
    if (deleteBtn && onDelete) {
      deleteBtn.addEventListener('click', () => onDelete(student.id));
    }

    tableBody.appendChild(row);
  });
};

export const displayNotification = (message, type = 'success') => {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  container.appendChild(notification);

  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
};

export const showValidationErrors = (errors) => {
  clearValidationErrors();
  
  Object.keys(errors).forEach(field => {
    const input = document.getElementById(field);
    const errorSpan = document.getElementById(`${field}-error`);
    
    if (input && errorSpan) {
      input.classList.add('invalid');
      errorSpan.textContent = errors[field];
    }
  });
};

export const clearValidationErrors = () => {
  const inputs = document.querySelectorAll('.form-group input, .form-group select');
  const errorSpans = document.querySelectorAll('.error-message');
  
  inputs.forEach(input => input.classList.remove('invalid'));
  errorSpans.forEach(span => span.textContent = '');
};

export const populateForm = (student) => {
  document.getElementById('student-id').value = student.id;
  document.getElementById('name').value = student.name;
  document.getElementById('email').value = student.email;
  document.getElementById('age').value = student.age;
  document.getElementById('department').value = student.department;
  
  document.getElementById('form-title').textContent = 'Edit Student';
  document.getElementById('submit-btn').textContent = 'Update Student';
  document.getElementById('cancel-btn').style.display = 'inline-block';
};

export const resetForm = () => {
  const form = document.getElementById('student-form');
  if (form) {
    form.reset();
    document.getElementById('student-id').value = '';
    document.getElementById('form-title').textContent = 'Add Student';
    document.getElementById('submit-btn').textContent = 'Save Student';
    document.getElementById('cancel-btn').style.display = 'none';
    clearValidationErrors();
  }
};

const escapeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};
