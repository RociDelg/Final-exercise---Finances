import { describe, it, expect, beforeEach } from 'vitest';
import { read, write, clear, remove } from '../../src/client/app/shared/cache.utils';

describe('Cache Utils', () => {
  beforeEach(() => {
    clear(); // Clear cache before each test
  });

  describe('write', () => {
    it('should store a value in the cache', () => {
      const url = 'https://api.example.com/data';
      const data = { id: 1, name: 'Test' };
      
      const result = write(url, data);
      
      expect(result).toEqual(data);
      expect(read(url)).toEqual(data);
    });

    it('should overwrite existing value for same key', () => {
      const url = 'https://api.example.com/data';
      const initialData = { id: 1, name: 'Test' };
      const newData = { id: 2, name: 'Updated' };
      
      write(url, initialData);
      const result = write(url, newData);
      
      expect(result).toEqual(newData);
      expect(read(url)).toEqual(newData);
    });
  });

  describe('read', () => {
    it('should return undefined for non-existent key', () => {
      const url = 'https://api.example.com/nonexistent';
      expect(read(url)).toBeUndefined();
    });

    it('should return cached value for existing key', () => {
      const url = 'https://api.example.com/data';
      const data = { id: 1, name: 'Test' };
      
      write(url, data);
      const result = read(url);
      
      expect(result).toEqual(data);
    });

    it('should maintain type information', () => {
      const url = 'https://api.example.com/data';
      const data = { id: 1, name: 'Test' };
      
      write(url, data);
      const result = read<typeof data>(url);
      
      expect(result?.id).toBe(1);
      expect(result?.name).toBe('Test');
    });
  });

  describe('clear', () => {
    it('should remove all entries from cache', () => {
      const urls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2'
      ];
      
      urls.forEach(url => write(url, { data: url }));
      clear();
      
      urls.forEach(url => {
        expect(read(url)).toBeUndefined();
      });
    });
  });

  describe('remove', () => {
    it('should remove specific entry from cache', () => {
      const url1 = 'https://api.example.com/data1';
      const url2 = 'https://api.example.com/data2';
      
      write(url1, { data: 'test1' });
      write(url2, { data: 'test2' });
      
      remove(url1);
      
      expect(read(url1)).toBeUndefined();
      expect(read(url2)).toEqual({ data: 'test2' });
    });

    it('should do nothing for non-existent key', () => {
      const url = 'https://api.example.com/nonexistent';
      expect(() => remove(url)).not.toThrow();
    });
  });
}); 