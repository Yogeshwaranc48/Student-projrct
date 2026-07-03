import { 
  validateName, 
  validateEmail, 
  validateAge, 
  validateDepartment, 
  validateStudentForm 
} from '../js/validation.js';

describe('Validation Functions', () => {
  describe('validateName', () => {
    it('should return invalid for empty name', () => {
      expect(validateName('')).toEqual({ isValid: false, message: 'Name is required' });
      expect(validateName(null)).toEqual({ isValid: false, message: 'Name is required' });
      expect(validateName('   ')).toEqual({ isValid: false, message: 'Name is required' });
    });

    it('should return invalid for name less than 3 characters', () => {
      expect(validateName('Jo')).toEqual({ isValid: false, message: 'Name must be at least 3 characters long' });
    });

    it('should return valid for correct name', () => {
      expect(validateName('John Doe')).toEqual({ isValid: true, message: '' });
    });
  });

  describe('validateEmail', () => {
    it('should return invalid for empty email', () => {
      expect(validateEmail('')).toEqual({ isValid: false, message: 'Email is required' });
    });

    it('should return invalid for incorrect email format', () => {
      expect(validateEmail('invalid-email')).toEqual({ isValid: false, message: 'Invalid email format' });
      expect(validateEmail('user@')).toEqual({ isValid: false, message: 'Invalid email format' });
      expect(validateEmail('@domain.com')).toEqual({ isValid: false, message: 'Invalid email format' });
    });

    it('should return valid for correct email format', () => {
      expect(validateEmail('user@example.com')).toEqual({ isValid: true, message: '' });
    });
  });

  describe('validateAge', () => {
    it('should return invalid for empty age', () => {
      expect(validateAge('')).toEqual({ isValid: false, message: 'Age is required' });
      expect(validateAge(null)).toEqual({ isValid: false, message: 'Age is required' });
      expect(validateAge(undefined)).toEqual({ isValid: false, message: 'Age is required' });
    });

    it('should return invalid for non-number', () => {
      expect(validateAge('twenty')).toEqual({ isValid: false, message: 'Age must be a number' });
    });

    it('should return invalid for age < 18 or > 60', () => {
      expect(validateAge(17)).toEqual({ isValid: false, message: 'Age must be between 18 and 60' });
      expect(validateAge(61)).toEqual({ isValid: false, message: 'Age must be between 18 and 60' });
      expect(validateAge('17')).toEqual({ isValid: false, message: 'Age must be between 18 and 60' });
    });

    it('should return valid for age between 18 and 60', () => {
      expect(validateAge(18)).toEqual({ isValid: true, message: '' });
      expect(validateAge(60)).toEqual({ isValid: true, message: '' });
      expect(validateAge(25)).toEqual({ isValid: true, message: '' });
    });
  });

  describe('validateDepartment', () => {
    it('should return invalid for empty department', () => {
      expect(validateDepartment('')).toEqual({ isValid: false, message: 'Department is required' });
    });

    it('should return valid for selected department', () => {
      expect(validateDepartment('Engineering')).toEqual({ isValid: true, message: '' });
    });
  });

  describe('validateStudentForm', () => {
    it('should validate entire form successfully', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        age: '22',
        department: 'Science'
      };
      const result = validateStudentForm(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should collect multiple errors for invalid form data', () => {
      const data = {
        name: 'Jo',
        email: 'invalid',
        age: 15,
        department: ''
      };
      const result = validateStudentForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('name');
      expect(result.errors).toHaveProperty('email');
      expect(result.errors).toHaveProperty('age');
      expect(result.errors).toHaveProperty('department');
    });
  });
});
