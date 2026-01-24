import type { Feature } from '../enums';

export class InvalidFeatureCombinationError extends Error {
  constructor(
    public readonly feature: Feature,
    public readonly requires: Feature,
  ) {
    super(`${feature} requires ${requires} to be enabled.`);
    this.name = 'InvalidFeatureCombinationError';
  }
}
