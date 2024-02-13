import type { DependencyResolutionStrategyType as DRST } from '../types/DependencyResolutionStrategyType';

export const DependencyResolutionStrategy = Object.freeze({
    POLYMORPHIC: 'POLYMORPHIC',
    DISCRETE: 'DISCRETE',
    EXPLICIT: 'EXPLICIT',
});
export const DependencyResolutionStrategyList: DRST[] = Object.values(
    DependencyResolutionStrategy,
);
