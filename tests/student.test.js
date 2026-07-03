import * as storage from '../js/storage.js';
import { 
  addStudent, 
  updateStudent, 
  deleteStudent, 
  getStudents, 
  setStudents,
  searchStudents,
  filterStudentsByDepartment,
  sortStudentsByName
} from '../js/student.js';

// Mock storage module
jest.mock('../js/storage.js');

describe('Student Logic Functions', () => {
  let initialStudents;

  beforeEach(() => {
    initialStudents = [
      { id: '1', name: 'Alice Smith', email: 'alice@example.com', age: 20, department: 'Arts' },
      { id: '2', name: 'Bob Johnson', email: 'bob@example.com', age: 22, department: 'Science' }
    ];
    setStudents(initialStudents);
    jest.clearAllMocks();
  });

  describe('addStudent', () => {
    it('should add a new student and save', () => {
      const newStudentData = { name: 'Charlie', email: 'charlie@example.com', age: 19, department: 'Math' };
      
      const added = addStudent(newStudentData);
      
      expect(added.id).toBeDefined();
      expect(added.name).toBe('Charlie');
      
      const currentStudents = getStudents();
      expect(currentStudents).toHaveLength(3);
      expect(storage.saveStudents).toHaveBeenCalledWith(currentStudents);
    });

    it('should throw error for duplicate email', () => {
      const duplicateData = { name: 'Alice 2', email: 'alice@example.com', age: 25, department: 'Arts' };
      
      expect(() => addStudent(duplicateData)).toThrow('Student with this email already exists');
      expect(storage.saveStudents).not.toHaveBeenCalled();
    });
  });

  describe('updateStudent', () => {
    it('should update existing student and save', () => {
      const updatedData = { name: 'Alice Brown', email: 'alice.brown@example.com' };
      
      const updated = updateStudent('1', updatedData);
      
      expect(updated.name).toBe('Alice Brown');
      expect(updated.email).toBe('alice.brown@example.com');
      expect(updated.age).toBe(20); // Unchanged field
      
      const currentStudents = getStudents();
      expect(storage.saveStudents).toHaveBeenCalledWith(currentStudents);
    });

    it('should throw error if student not found', () => {
      expect(() => updateStudent('999', { name: 'Ghost' })).toThrow('Student not found');
    });

    it('should throw error if email is taken by another student', () => {
      expect(() => updateStudent('1', { email: 'bob@example.com' })).toThrow('Another student with this email already exists');
    });
  });

  describe('deleteStudent', () => {
    it('should delete student and save', () => {
      const result = deleteStudent('1');
      
      expect(result).toBe(true);
      
      const currentStudents = getStudents();
      expect(currentStudents).toHaveLength(1);
      expect(currentStudents[0].id).toBe('2');
      expect(storage.saveStudents).toHaveBeenCalledWith(currentStudents);
    });

    it('should throw error if student not found to delete', () => {
      expect(() => deleteStudent('999')).toThrow('Student not found');
      expect(storage.saveStudents).not.toHaveBeenCalled();
    });
  });

  describe('searchStudents', () => {
    it('should return all students if query is empty or null', () => {
      expect(searchStudents('')).toHaveLength(2);
      expect(searchStudents(null)).toHaveLength(2);
      expect(searchStudents('   ')).toHaveLength(2);
    });

    it('should filter by name (case-insensitive)', () => {
      const results = searchStudents('alice');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Alice Smith');
    });

    it('should filter by email', () => {
      const results = searchStudents('bob@');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Bob Johnson');
    });

    it('should return empty array if no match', () => {
      const results = searchStudents('xyz123');
      expect(results).toHaveLength(0);
    });
  });

  describe('filterStudentsByDepartment', () => {
    it('should return all if department is empty or null', () => {
      expect(filterStudentsByDepartment('')).toHaveLength(2);
      expect(filterStudentsByDepartment(null)).toHaveLength(2);
      expect(filterStudentsByDepartment('  ')).toHaveLength(2);
    });

    it('should return filtered by department', () => {
      const results = filterStudentsByDepartment('Arts');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Alice Smith');
    });
  });

  describe('sortStudentsByName', () => {
    it('should sort ascending by default', () => {
      const results = sortStudentsByName();
      expect(results[0].name).toBe('Alice Smith');
      expect(results[1].name).toBe('Bob Johnson');
    });

    it('should sort descending', () => {
      const results = sortStudentsByName(getStudents(), false);
      expect(results[0].name).toBe('Bob Johnson');
      expect(results[1].name).toBe('Alice Smith');
    });

    it('should handle equal names', () => {
      setStudents([
        { id: '1', name: 'Alice Smith' },
        { id: '2', name: 'Alice Smith' }
      ]);
      const results = sortStudentsByName();
      expect(results).toHaveLength(2);
    });
  });
});
