import type { InjectionToken } from '../../misc';
import type { IDependencyWraplet } from '../interfaces/IDependencyWraplet';

export type DIRegistry<T extends {} = {}> = Map<
    InjectionToken<T>,
    IDependencyWraplet<T>
>;
