import type { DependencyResolutionStrategy } from '../misc/constants';

export type DependencyResolutionStrategyType =
    (typeof DependencyResolutionStrategy)[keyof typeof DependencyResolutionStrategy];
