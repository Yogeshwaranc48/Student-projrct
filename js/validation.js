export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return { isValid: false, message: 'Name is required' };
  }
  if (name.trim().length < 3) {
    return { isValid: false, message: 'Name must be at least 3 characters long' };
  }
  return { isValid: true, message: '' };
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  return { isValid: true, message: '' };
};

export const validateAge = (age) => {
  if (age === null || age === undefined || age === '') {
    return { isValid: false, message: 'Age is required' };
  }
  const parsedAge = parseInt(age, 10);
  if (isNaN(parsedAge)) {
    return { isValid: false, message: 'Age must be a number' };
  }
  if (parsedAge < 18 || parsedAge > 60) {
    return { isValid: false, message: 'Age must be between 18 and 60' };
  }
  return { isValid: true, message: '' };
};

export const validateDepartment = (department) => {
  if (!department || department.trim() === '') {
    return { isValid: false, message: 'Department is required' };
  }
  return { isValid: true, message: '' };
};

export const validateStudentForm = (studentData) => {
  const errors = {};
  
  const nameValidation = validateName(studentData.name);
  if (!nameValidation.isValid) errors.name = nameValidation.message;
  
  const emailValidation = validateEmail(studentData.email);
  if (!emailValidation.isValid) errors.email = emailValidation.message;
  
  const ageValidation = validateAge(studentData.age);
  if (!ageValidation.isValid) errors.age = ageValidation.message;
  
  const deptValidation = validateDepartment(studentData.department);
  if (!deptValidation.isValid) errors.department = deptValidation.message;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
