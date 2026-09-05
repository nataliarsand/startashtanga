import { describe, it, expect } from 'vitest';
import { distanceKm } from './geo';

describe('distanceKm', () => {
  it('is zero for the same point', () => {
    expect(distanceKm({ lat: 52.37, lng: 4.9 }, { lat: 52.37, lng: 4.9 })).toBe(
      0
    );
  });

  it('matches the known Amsterdam to Mysore distance', () => {
    const amsterdam = { lat: 52.3676, lng: 4.9041 };
    const mysore = { lat: 12.2958, lng: 76.6394 };
    expect(distanceKm(amsterdam, mysore)).toBeCloseTo(7726, -2);
  });

  it('is symmetric', () => {
    const a = { lat: -22.98, lng: -43.23 };
    const b = { lat: 35.67, lng: 139.71 };
    expect(distanceKm(a, b)).toBeCloseTo(distanceKm(b, a), 6);
  });
});
