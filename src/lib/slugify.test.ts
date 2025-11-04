import { describe, it, expect } from 'vitest';
import {
  generateInstallerSlug,
  generateCitySlug,
  stripDisambiguationSuffix,
  getInstallerIdFromSlug,
} from './slugify';

describe('slugify utilities', () => {
  describe('generateInstallerSlug', () => {
    it('should use company name if provided', () => {
      const result = generateInstallerSlug('Solar Power Co', 'John Doe');
      expect(result).toBe('solar-power-co');
    });

    it('should use name if company name is null', () => {
      const result = generateInstallerSlug(null, 'John Doe');
      expect(result).toBe('john-doe');
    });

    it('should convert to lowercase', () => {
      const result = generateInstallerSlug('SOLAR POWER CO', 'John');
      expect(result).toBe('solar-power-co');
    });

    it('should replace spaces with hyphens', () => {
      const result = generateInstallerSlug('Solar Power Company', 'John');
      expect(result).toBe('solar-power-company');
    });

    it('should remove special characters', () => {
      const result = generateInstallerSlug('Solar & Power Co.', 'John');
      expect(result).toBe('solar-power-co');
    });

    it('should replace multiple spaces with single hyphen', () => {
      const result = generateInstallerSlug('Solar    Power', 'John');
      expect(result).toBe('solar-power');
    });

    it('should replace multiple hyphens with single hyphen', () => {
      const result = generateInstallerSlug('Solar---Power', 'John');
      expect(result).toBe('solar-power');
    });

    it('should trim whitespace', () => {
      const result = generateInstallerSlug('  Solar Power  ', 'John');
      expect(result).toBe('solar-power');
    });

    it('should handle empty strings', () => {
      const result = generateInstallerSlug('', '');
      expect(result).toBe('');
    });

    it('should handle mixed case and special characters', () => {
      const result = generateInstallerSlug("Bob's Solar & Electric!", 'Bob');
      expect(result).toBe('bobs-solar-electric');
    });
  });

  describe('generateCitySlug', () => {
    it('should convert city name to lowercase slug', () => {
      const result = generateCitySlug('Houston');
      expect(result).toBe('houston');
    });

    it('should replace spaces with hyphens', () => {
      const result = generateCitySlug('San Antonio');
      expect(result).toBe('san-antonio');
    });

    it('should remove special characters', () => {
      const result = generateCitySlug('St. Louis');
      expect(result).toBe('st-louis');
    });

    it('should handle multiple spaces', () => {
      const result = generateCitySlug('New   York');
      expect(result).toBe('new-york');
    });

    it('should replace multiple hyphens with single hyphen', () => {
      const result = generateCitySlug('Fort--Worth');
      expect(result).toBe('fort-worth');
    });

    it('should trim whitespace', () => {
      const result = generateCitySlug('  Dallas  ');
      expect(result).toBe('dallas');
    });
  });

  describe('stripDisambiguationSuffix', () => {
    it('should remove trailing number suffix', () => {
      const result = stripDisambiguationSuffix('solar-power-2');
      expect(result).toBe('solar-power');
    });

    it('should remove -3 suffix', () => {
      const result = stripDisambiguationSuffix('installer-name-3');
      expect(result).toBe('installer-name');
    });

    it('should not modify slug without number suffix', () => {
      const result = stripDisambiguationSuffix('solar-power');
      expect(result).toBe('solar-power');
    });

    it('should not modify slug with number in middle', () => {
      const result = stripDisambiguationSuffix('solar-2-power');
      expect(result).toBe('solar-2-power');
    });

    it('should handle large numbers', () => {
      const result = stripDisambiguationSuffix('installer-100');
      expect(result).toBe('installer');
    });
  });

  describe('getInstallerIdFromSlug', () => {
    it('should extract ID from end of slug', () => {
      const result = getInstallerIdFromSlug('houston-solar-power-123');
      expect(result).toBe('123');
    });

    it('should extract single character ID', () => {
      const result = getInstallerIdFromSlug('installer-1');
      expect(result).toBe('1');
    });

    it('should handle slug with multiple hyphens', () => {
      const result = getInstallerIdFromSlug('big-solar-company-name-456');
      expect(result).toBe('456');
    });

    it('should handle slug without hyphens', () => {
      const result = getInstallerIdFromSlug('installer');
      expect(result).toBe('installer');
    });
  });
});
