import { saveStudents, loadStudents, clearStorage } from '../js/storage.js';

describe('Storage Functions', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('saveStudents', () => {
    it('should save data to localStorage', () => {
      const data = [{ id: '1', name: 'John Doe' }];
      const result = saveStudents(data);
      
      expect(result).toBe(true);
      expect(localStorage.getItem('students_data')).toEqual(JSON.stringify(data));
    });

    it('should handle quota exceeded error', () => {
      // Mock localStorage to throw error
      const mockSetItem = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Quota exceeded');
      });
      
      // Mock console.error
      const mockConsole = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = saveStudents([{ id: '1' }]);
      
      expect(result).toBe(false);
      expect(mockConsole).toHaveBeenCalled();
      
      mockSetItem.mockRestore();
      mockConsole.mockRestore();
    });
  });

  describe('loadStudents', () => {
    it('should return empty array if no data exists', () => {
      const result = loadStudents();
      expect(result).toEqual([]);
    });

    it('should return parsed data if data exists', () => {
      const data = [{ id: '1', name: 'John Doe' }];
      localStorage.setItem('students_data', JSON.stringify(data));
      
      const result = loadStudents();
      expect(result).toEqual(data);
    });

    it('should handle JSON parse error gracefully', () => {
      localStorage.setItem('students_data', 'invalid json');
      const mockConsole = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = loadStudents();
      
      expect(result).toEqual([]);
      expect(mockConsole).toHaveBeenCalled();
      
      mockConsole.mockRestore();
    });
  });

  describe('clearStorage', () => {
    it('should remove item from localStorage', () => {
      localStorage.setItem('students_data', 'some data');
      const result = clearStorage();
      
      expect(result).toBe(true);
      expect(localStorage.getItem('students_data')).toBeNull();
    });

    it('should handle errors when clearing storage', () => {
      const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Cannot remove item');
      });
      const mockConsole = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = clearStorage();
      
      expect(result).toBe(false);
      expect(mockConsole).toHaveBeenCalled();
      
      mockRemoveItem.mockRestore();
      mockConsole.mockRestore();
    });
  });
});
