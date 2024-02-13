import type { InjectionToken } from '../../misc';
import type { IDependencyWraplet } from '../interfaces/IDependencyWraplet';

export type DIRegistry<T extends object = object> = Map<
    InjectionToken<T>,
    IDependencyWraplet<T>
>;
