import { 
  renderStudentsTable, 
  displayNotification, 
  showValidationErrors, 
  clearValidationErrors,
  populateForm,
  resetForm
} from '../js/ui.js';

describe('UI Functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="notification-container"></div>
      
      <h2 id="form-title">Add Student</h2>
      <form id="student-form">
        <input type="hidden" id="student-id" />
        
        <div class="form-group">
          <input type="text" id="name" />
          <span class="error-message" id="name-error"></span>
        </div>
        
        <div class="form-group">
          <input type="email" id="email" />
          <span class="error-message" id="email-error"></span>
        </div>

        <div class="form-group">
          <input type="number" id="age" />
          <span class="error-message" id="age-error"></span>
        </div>

        <div class="form-group">
          <select id="department">
            <option value="Arts">Arts</option>
          </select>
          <span class="error-message" id="department-error"></span>
        </div>
        
        <button id="submit-btn">Save Student</button>
        <button id="cancel-btn" style="display: none;">Cancel</button>
      </form>

      <div class="table-responsive">
        <table>
          <tbody id="students-table-body"></tbody>
        </table>
      </div>
      <div id="empty-state" style="display: none;">No students</div>
    `;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('renderStudentsTable', () => {
    it('should display empty state when no students', () => {
      renderStudentsTable([], jest.fn(), jest.fn());
      
      expect(document.querySelector('.table-responsive').style.display).toBe('none');
      expect(document.getElementById('empty-state').style.display).toBe('block');
      expect(document.getElementById('students-table-body').innerHTML).toBe('');
    });
    
    it('should return early if DOM elements are missing', () => {
      document.body.innerHTML = '';
      renderStudentsTable([], jest.fn(), jest.fn());
      // No error thrown
    });

    it('should handle optional edit and delete callbacks', () => {
      const mockStudents = [
        { id: '1', name: 'John', email: 'j@j.com', age: 20, department: 'Arts' }
      ];
      renderStudentsTable(mockStudents);
      const editBtn = document.querySelector('.btn-edit');
      const deleteBtn = document.querySelector('.btn-danger');
      editBtn.click();
      deleteBtn.click();
      // No error thrown
    });

    it('should render student rows', () => {
      const mockStudents = [
        { id: '1', name: 'John', email: 'j@j.com', age: 20, department: 'Arts' }
      ];
      
      renderStudentsTable(mockStudents, jest.fn(), jest.fn());
      
      expect(document.querySelector('.table-responsive').style.display).toBe('block');
      expect(document.getElementById('empty-state').style.display).toBe('none');
      
      const rows = document.querySelectorAll('#students-table-body tr');
      expect(rows).toHaveLength(1);
      expect(rows[0].innerHTML).toContain('John');
      expect(rows[0].innerHTML).toContain('j@j.com');
    });

    it('should attach edit and delete listeners', () => {
      const mockStudents = [{ id: '1', name: 'John', email: 'j@j.com', age: 20, department: 'Arts' }];
      const mockEdit = jest.fn();
      const mockDelete = jest.fn();
      
      renderStudentsTable(mockStudents, mockDelete, mockEdit);
      
      const editBtn = document.querySelector('.btn-edit');
      const deleteBtn = document.querySelector('.btn-danger');
      
      editBtn.click();
      expect(mockEdit).toHaveBeenCalledWith('1');
      
      deleteBtn.click();
      expect(mockDelete).toHaveBeenCalledWith('1');
    });
    
    it('should escape HTML to prevent XSS', () => {
      const mockStudents = [{ id: '1', name: '<script>alert("xss")</script>', email: 'j@j.com', age: 20, department: 'Arts' }];
      
      renderStudentsTable(mockStudents, jest.fn(), jest.fn());
      
      const rows = document.querySelectorAll('#students-table-body tr');
      expect(rows[0].innerHTML).not.toContain('<script>');
      expect(rows[0].innerHTML).toContain('&lt;script&gt;');
    });
  });

  describe('displayNotification', () => {
    it('should render notification and remove it after 3s', () => {
      displayNotification('Test message', 'success');
      
      const container = document.getElementById('notification-container');
      expect(container.children).toHaveLength(1);
      expect(container.children[0].className).toBe('notification success');
      expect(container.children[0].textContent).toBe('Test message');
      
      jest.advanceTimersByTime(3000);
      
      expect(container.children).toHaveLength(0);
    });
    
    it('should return early if container is missing', () => {
      document.body.innerHTML = '';
      displayNotification('Test message');
      // No error
    });
    
    it('should handle missing parentNode gracefully', () => {
      displayNotification('Test message');
      const container = document.getElementById('notification-container');
      container.innerHTML = ''; // removed manually before timeout
      jest.advanceTimersByTime(3000);
      // No error
    });
  });

  describe('showValidationErrors & clearValidationErrors', () => {
    it('should return early if input or span is missing', () => {
      document.body.innerHTML = '';
      const errors = { name: 'Name error' };
      showValidationErrors(errors);
      // No error
    });

    it('should display validation errors', () => {
      const errors = { name: 'Name error', email: 'Email error' };
      showValidationErrors(errors);
      
      expect(document.getElementById('name').classList.contains('invalid')).toBe(true);
      expect(document.getElementById('name-error').textContent).toBe('Name error');
      
      expect(document.getElementById('email').classList.contains('invalid')).toBe(true);
      expect(document.getElementById('email-error').textContent).toBe('Email error');
    });

    it('should clear validation errors', () => {
      const errors = { name: 'Name error' };
      showValidationErrors(errors);
      clearValidationErrors();
      
      expect(document.getElementById('name').classList.contains('invalid')).toBe(false);
      expect(document.getElementById('name-error').textContent).toBe('');
    });
  });

  describe('populateForm', () => {
    it('should fill form fields and update UI state', () => {
      const student = { id: '123', name: 'Test', email: 't@t.com', age: 22, department: 'Arts' };
      populateForm(student);
      
      expect(document.getElementById('student-id').value).toBe('123');
      expect(document.getElementById('name').value).toBe('Test');
      
      expect(document.getElementById('form-title').textContent).toBe('Edit Student');
      expect(document.getElementById('submit-btn').textContent).toBe('Update Student');
      expect(document.getElementById('cancel-btn').style.display).toBe('inline-block');
    });
  });

  describe('resetForm', () => {
    it('should clear form and restore UI state', () => {
      // First populate it
      populateForm({ id: '123', name: 'Test', email: 't@t.com', age: 22, department: 'Arts' });
      
      resetForm();
      
      expect(document.getElementById('student-id').value).toBe('');
      expect(document.getElementById('name').value).toBe('');
      
      expect(document.getElementById('form-title').textContent).toBe('Add Student');
      expect(document.getElementById('submit-btn').textContent).toBe('Save Student');
      expect(document.getElementById('cancel-btn').style.display).toBe('none');
    });

    it('should handle missing form gracefully', () => {
      document.body.innerHTML = '';
      resetForm();
      // No error
    });
  });
});
