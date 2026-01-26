import { describe, it, expect } from 'vitest';
import {
  BUSINESS_INFO,
  getUSLocation,
  getMexicoLocation,
  getLocationByKey,
  getPrimaryPhone,
  getPrimaryEmail,
  getBusinessName,
  getBusinessNameFull,
  getSocialMediaLinks,
} from './business-info.constants';

describe('BusinessInfoConstants', () => {
  describe('BUSINESS_INFO', () => {
    it('should have business name', () => {
      expect(BUSINESS_INFO.name).toBe('Larios Income Tax');
      expect(BUSINESS_INFO.nameFull).toBe('Larios Income Tax and Immigration');
    });

    it('should have tagline', () => {
      expect(BUSINESS_INFO.tagline).toBeTruthy();
      expect(BUSINESS_INFO.tagline).toContain('Larios Income Tax');
    });

    it('should have US location information', () => {
      const usLocation = BUSINESS_INFO.locations.us;
      expect(usLocation.name).toBe('United States Office');
      expect(usLocation.address.street).toBe('3317 El Cajon Blvd');
      expect(usLocation.address.city).toBe('San Diego');
      expect(usLocation.address.state).toBe('CA');
      expect(usLocation.address.zip).toBe('92104');
      expect(usLocation.contact.phoneFormatted).toBe('(619) 972-3350');
      expect(usLocation.contact.email).toBe('lariosincometax@gmail.com');
    });

    it('should have Mexico location information', () => {
      const mexicoLocation = BUSINESS_INFO.locations.mexico;
      expect(mexicoLocation.name).toBe('Mexico Office');
      expect(mexicoLocation.address.formatted).toContain('Tijuana');
      expect(mexicoLocation.contact.phoneFormatted).toBe('(619) 949-8007');
      expect(mexicoLocation.contact.email).toBe('alianzalatina18@gmail.com');
    });

    it('should have social media links', () => {
      expect(BUSINESS_INFO.socialMedia.facebook).toContain('facebook.com');
      expect(BUSINESS_INFO.socialMedia.instagram).toContain('instagram.com');
    });

    it('should have copyright information', () => {
      expect(BUSINESS_INFO.copyright).toContain('LARIOS INCOME TAX');
    });

    it('should have map embeds for both locations', () => {
      expect(BUSINESS_INFO.locations.us.mapEmbed).toContain('google.com/maps');
      expect(BUSINESS_INFO.locations.mexico.mapEmbed).toContain('google.com/maps');
    });
  });

  describe('Helper Functions', () => {
    it('getUSLocation should return US location', () => {
      const location = getUSLocation();
      expect(location.name).toBe('United States Office');
      expect(location.address.city).toBe('San Diego');
    });

    it('getMexicoLocation should return Mexico location', () => {
      const location = getMexicoLocation();
      expect(location.name).toBe('Mexico Office');
      expect(location.address.city).toBe('Tijuana');
    });

    it('getLocationByKey should return correct location', () => {
      const usLocation = getLocationByKey('us');
      const mexicoLocation = getLocationByKey('mexico');
      expect(usLocation.address.city).toBe('San Diego');
      expect(mexicoLocation.address.city).toBe('Tijuana');
    });

    it('getPrimaryPhone should return formatted phone', () => {
      expect(getPrimaryPhone()).toBe('(619) 972-3350');
    });

    it('getPrimaryEmail should return email', () => {
      expect(getPrimaryEmail()).toBe('lariosincometax@gmail.com');
    });

    it('getBusinessName should return business name', () => {
      expect(getBusinessName()).toBe('Larios Income Tax');
    });

    it('getBusinessNameFull should return full business name', () => {
      expect(getBusinessNameFull()).toBe('Larios Income Tax and Immigration');
    });

    it('getSocialMediaLinks should return social media links', () => {
      const links = getSocialMediaLinks();
      expect(links.facebook).toContain('facebook.com');
      expect(links.instagram).toContain('instagram.com');
    });
  });
});
