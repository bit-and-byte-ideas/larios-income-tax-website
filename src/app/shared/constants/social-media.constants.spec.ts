import { SOCIAL_MEDIA_LINKS } from './social-media.constants';

describe('SocialMediaConstants', () => {
  it('should have correct Facebook URL', () => {
    expect(SOCIAL_MEDIA_LINKS.facebook).toBe(
      'https://www.facebook.com/Larios-income-tax-and-immigration-1579801562253516/'
    );
  });

  it('should have correct Instagram URL', () => {
    expect(SOCIAL_MEDIA_LINKS.instagram).toBe(
      'https://www.instagram.com/lariosincometaxandimmigration/'
    );
  });

  it('should be a frozen object', () => {
    expect(Object.isFrozen(SOCIAL_MEDIA_LINKS)).toBe(true);
  });

  it('should have only facebook and instagram properties', () => {
    expect(Object.keys(SOCIAL_MEDIA_LINKS)).toEqual(['facebook', 'instagram']);
  });
});
