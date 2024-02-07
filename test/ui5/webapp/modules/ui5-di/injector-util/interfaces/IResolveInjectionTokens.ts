import type { Class, Nullable, PrimitiveInjectionToken } from '../../misc';
import type { DependencyResolutionStrategyType as DRST } from '../types/DependencyResolutionStrategyType';

export interface IResolveInjectionTokens<T extends {}> {
    readonly dependencyClass: Class<T>;
    readonly drs: DRST;
    readonly primitiveToken: Nullable<PrimitiveInjectionToken>;
}
